import Client from "@/models/client.model";
import Compagnie from "@/models/compagnie.model";
import { connectToDB } from "@/db/db";
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Fonction POST pour créer un nouveau client
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, email, tel, address, compagnieId } = reqBody;

        // Validation des données
        if (!name || !email || !tel || !address) {
            return NextResponse.json({ success: false, message: 'Tous les champs sont requis' }, { status: 400 });
        }

        await connectToDB();
        

        // Vérifier si un client avec le même email existe déjà
        const existingClient = await Client.findOne({ email });
        if (existingClient) {
            return NextResponse.json({ success: false, message: 'Un client avec cet email existe déjà' }, { status: 400 });
        }
        
        
        // Vérifier si la compagnie existe
        const compagnie = await Compagnie.findById(compagnieId).populate('factures').exec();
        if (!compagnie) {
            return NextResponse.json({ success: false, message: 'Compagnie non trouvée' }, { status: 404 });
        }

        // Créer un nouveau client
        const newClient = new Client({
            name,
            email,
            tel,
            address,
        });

        // Sauvegarder le nouveau client
        const savedClient = await newClient.save();

         // Ajouter l'ID du client à la compagnie associée
         compagnie.clients.push(savedClient._id as mongoose.Types.ObjectId);
         await compagnie.save();
 

        return NextResponse.json({ success: true, client: savedClient });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Erreur lors de la création du client' }, { status: 500 });
    }
}
// Fonction GET pour récupérer les clients d'une compagnie spécifique
export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const compagnieId = url.searchParams.get('compagnieId');

        if (!compagnieId) {
            return NextResponse.json({ success: false, message: 'compagnieId est requis' }, { status: 400 });
        }

        await connectToDB();

        // Vérifier si la compagnie existe
        const compagnie = await Compagnie.findById(compagnieId).populate('clients').exec();
        if (!compagnie) {
            return NextResponse.json({ success: false, message: 'Compagnie non trouvée' }, { status: 404 });
        }

        // Récupérer les clients associés à la compagnie
        const clients = compagnie.clients;

        return NextResponse.json({ success: true, clients });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Erreur lors de la récupération des clients' }, { status: 500 });
    }
}