import Client from "@/models/client.model";
import { connectToDB } from "@/db/db";
import { NextRequest, NextResponse } from 'next/server';

// Fonction POST pour créer un nouveau client
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, email, tel, address } = reqBody;

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

        // Créer un nouveau client
        const newClient = new Client({
            name,
            email,
            tel,
            address,
        });

        // Sauvegarder le nouveau client
        const savedClient = await newClient.save();

        return NextResponse.json({ success: true, client: savedClient });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Erreur lors de la création du client' }, { status: 500 });
    }
}
