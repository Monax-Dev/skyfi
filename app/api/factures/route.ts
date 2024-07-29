import Facture from "@/models/facture.model";
import Compagnie from "@/models/compagnie.model";
import Client from "@/models/client.model";
import { connectToDB } from "@/db/db";
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import mongoose from 'mongoose';

// Fonction POST pour créer une facture avec plusieurs items
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, items, compagnieId, clientId } = reqBody; // items doit être un tableau d'objets représentant les items, compagnieId et clientId sont les ID de la compagnie et du client

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
        const compagnie = await Compagnie.findById(compagnieId);
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
            isPaid: false,
            createdBy: userId, // Associer la facture à l'utilisateur qui l'a créée
            client: clientId, // Associer la facture au client
        });

        // Sauvegarder la nouvelle facture
        const savedFacture = await newFacture.save();

        // Ajouter l'ID de la facture à la compagnie associée
        compagnie.factures.push(savedFacture._id as mongoose.Types.ObjectId);
        await compagnie.save();

        return NextResponse.json({ success: true, facture: savedFacture });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Erreur lors de la création de la facture' }, { status: 500 });
    }
}

// Fonction GET pour récupérer les factures d'une compagnie spécifique
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Connecter à la base de données
        await connectToDB();

        // Récupérer les données de l'utilisateur à partir du token
        const tokenData = await getDataFromToken(request);
        const userId = tokenData.userId;

        // Récupérer l'ID de la compagnie à partir des paramètres de la requête
        const compagnieId = params;

        if (!compagnieId) {
            return NextResponse.json({ success: false, message: 'ID de la compagnie requis' }, { status: 400 });
        }

        // Vérifier si la compagnie existe
        const compagnie = await Compagnie.findById(compagnieId);
        if (!compagnie) {
            return NextResponse.json({ success: false, message: 'Compagnie non trouvée' }, { status: 404 });
        }

        // Récupérer les factures associées à cette compagnie
        const factures = await Facture.find({ _id: { $in: compagnie.factures } });

        return NextResponse.json({ success: true, factures: factures });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Erreur lors de la récupération des factures' }, { status: 500 });
    }
}