import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/db/db";
import Compagnie from "@/models/compagnie.model";
import Facture from '@/models/facture.model';
import Depense from '@/models/depense.model';
import User from '@/models/user.model';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDB();
        const { id } = params;

        // Trouver la compagnie par ID
        const compagnie = await Compagnie.findById(id);

        if (!compagnie) {
            return NextResponse.json({ error: 'Compagnie not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, compagnie });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDB();
        const { id } = params;
        const { name, email, tel, address, chiffreAffaires } = await request.json();

        // Mettre à jour la compagnie par ID
        const compagnie = await Compagnie.findByIdAndUpdate(
            id,
            { name, email, tel, address, chiffreAffaires },
            { new: true, runValidators: true }
        );

        if (!compagnie) {
            return NextResponse.json({ error: 'Compagnie not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, compagnie });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDB();
        const { id } = params;

        // Supprimer la compagnie par ID
        const compagnie = await Compagnie.findByIdAndDelete(id);

        if (!compagnie) {
            return NextResponse.json({ error: 'Compagnie not found' }, { status: 404 });
        }

        // Supprimer les factures et les dépenses associées
        await Facture.deleteMany({ _id: { $in: compagnie.factures } });
        await Depense.deleteMany({ _id: { $in: compagnie.depenses } });

        // Supprimer les membres associés
        await User.deleteMany({ _id: compagnie.createdBy });

        return NextResponse.json({ success: true, message: 'Compagnie et ses associations supprimées avec succès' });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
