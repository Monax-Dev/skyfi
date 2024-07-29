import { NextRequest, NextResponse } from 'next/server';
import Member from '@/models/member.model'; // Assurez-vous que le modèle est correctement importé
import User from '@/models/user.model';
import { connectToDB } from '@/db/db';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDB();

        const reqBody = await request.json();
        const { role } = reqBody;
        const { id } = params;

        // Mettre à jour le rôle du membre
        const updatedMember = await Member.findByIdAndUpdate(id, { role }, { new: true });
        if (!updatedMember) {
            return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, member: updatedMember });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Error updating member' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDB();

        const { id } = params;

        // Récupérer le membre avant de le supprimer
        const member = await Member.findById(id);
        if (!member) {
            return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 });
        }

        // Supprimer le membre
        await Member.findByIdAndDelete(id);

        // Mettre à jour le tableau compagnies de l'utilisateur
        await User.findByIdAndUpdate(member.user, { $pull: { compagnies: member.compagnie } });

        return NextResponse.json({ success: true, message: 'Member removed' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Error removing member' }, { status: 500 });
    }
}
