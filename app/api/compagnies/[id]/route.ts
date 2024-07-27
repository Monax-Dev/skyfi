import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/db/db";
import Compagnie from "@/models/compagnie.model";

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

        return NextResponse.json({ success: true, message: 'Compagnie deleted successfully' });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
