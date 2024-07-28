import Client from "@/models/client.model";
import { connectToDB } from "@/db/db";
import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';

// Fonction PUT pour mettre à jour un client par son ID
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const reqBody = await request.json();
        const { name, email, tel, address } = reqBody;

        // Validation des données
        if (!name && !email && !tel && !address) {
            return NextResponse.json({ success: false, message: 'Au moins un champ doit être fourni pour la mise à jour' }, { status: 400 });
        }

        await connectToDB();

        // Vérifier si l'ID est valide
        if (!Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: 'ID invalide' }, { status: 400 });
        }

        // Trouver et mettre à jour le client
        const updatedClient = await Client.findByIdAndUpdate(
            id,
            { name, email, tel, address },
            { new: true, runValidators: true }
        );

        if (!updatedClient) {
            return NextResponse.json({ success: false, message: 'Client non trouvé' }, { status: 404 });
        }

        return NextResponse.json({ success: true, client: updatedClient });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Erreur lors de la mise à jour du client' }, { status: 500 });
    }
}
