import Facture from "@/models/facture.model";
import Compagnie from "@/models/compagnie.model";
import Client from "@/models/client.model";
import { connectToDB } from "@/db/db";
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, items, compagnieId, clientId, isPaid } = reqBody; // items doit être un tableau d'objets représentant les items, compagnieId et clientId sont les ID de la compagnie et du client

        await connectToDB();

        // Récupérer les données de l'utilisateur à partir du token
        const tokenData = await getDataFromToken(request);
        const userId = tokenData.userId;

        // Définir les types pour les paramètres de la méthode reduce
        type Item = {
            name: string;
            quantity: number;
            prixUnitaire: number;
        };

        // Calculer le total à payer
        const totalAPayer = items.reduce((acc: number, item: Item) => acc + (item.quantity * item.prixUnitaire), 0);

        // Vérifier si la compagnie existe
        const compagnie = await Compagnie.findById(compagnieId).populate('factures').exec();
        if (!compagnie) {
            return NextResponse.json({ success: false, message: 'Compagnie non trouvée' }, { status: 404 });
        }

        // Vérifier si le client existe
        const client = await Client.findById(clientId);
        if (!client) {
            return NextResponse.json({ success: false, message: 'Client non trouvé' }, { status: 404 });
        }

        // Créer une nouvelle facture avec les items
        const newFacture = new Facture({
            name,
            items: items,
            totalAPayer: totalAPayer,
            compagnie: compagnieId,
            isPaid: isPaid,
            createdBy: userId, 
            client: clientId,
        });

        // Sauvegarder la nouvelle facture
        const savedFacture = await newFacture.save();

        // Ajouter l'ID de la facture à la compagnie associée
        compagnie.factures.push(savedFacture._id as mongoose.Types.ObjectId);
        await compagnie.save();

        // Réinitialiser les revenus totaux en cas de mise à jour
        const factures = await Facture.find({ _id: { $in: compagnie.factures } }).exec();
        const revenusTotals = factures.reduce((sum, facture) => facture.isPaid ? sum + facture.totalAPayer : sum, 0);
        
        compagnie.revenusTotals = revenusTotals;
        await compagnie.save(); // Mettre à jour les revenus totaux de la compagnie

        return NextResponse.json({ success: true, facture: savedFacture });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Erreur lors de la création de la facture' }, { status: 500 });
    }
}


// Fonction GET pour récupérer les factures d'une compagnie spécifique
export async function GET(request: NextRequest) {
    try {
        await connectToDB();

        // Récupérer les données de l'utilisateur à partir du token
        const userId = await getDataFromToken(request);

        // Extraire les paramètres de requête
        const url = new URL(request.url);
        const compagnieId = url.searchParams.get('compagnieId');

        // Vérifier si la compagnie existe
        const compagnie = await Compagnie.findById(compagnieId).populate('factures').exec();
        if (!compagnie) {
            return NextResponse.json({ success: false, message: 'Compagnie non trouvée' }, { status: 404 });
        }

        // Vérifier si l'utilisateur est autorisé à accéder aux factures de cette compagnie
        if (compagnie.createdBy.toString() !== userId) {
            return NextResponse.json({ success: false, message: 'Accès non autorisé' }, { status: 403 });
        }

        // Récupérer les factures de la compagnie
        const factures = await Facture.find({ _id: { $in: compagnie.factures } }).exec();

        return NextResponse.json({ success: true, factures });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Erreur lors de la récupération des factures' }, { status: 500 });
    }
}