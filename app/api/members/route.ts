import { NextRequest, NextResponse } from 'next/server';
import Member from '@/models/member.model'; // Assurez-vous que le modèle est correctement importé
import User from '@/models/user.model';
import Compagnie from '@/models/compagnie.model';
import { connectToDB } from '@/db/db';
import { getDataFromToken } from '@/helpers/getDataFromToken';

export async function POST(request: NextRequest) {
    try {
        await connectToDB();

        const reqBody = await request.json();
        const { userId, companyId, role } = reqBody;

        // Récupérer les données de l'utilisateur à partir du token
        const tokenData = await getDataFromToken(request);
        const authUserId = tokenData.userId;

        // Vérifier si l'utilisateur et la compagnie existent
        const user = await User.findById(userId);
        const company = await Compagnie.findById(companyId);

        if (!user || !company) {
            return NextResponse.json({ success: false, message: 'User or Company not found' }, { status: 404 });
        }

        // Ajouter le nouveau membre
        const newMember = new Member({
            user: userId,
            company: companyId,
            role
        });
        await newMember.save();

        // Mettre à jour le tableau compagnies de l'utilisateur
        user.compagnies.push(companyId);
        await user.save();

        return NextResponse.json({ success: true, member: newMember });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Error adding member' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        await connectToDB();

        // Récupérer l'ID de la compagnie à partir des paramètres de la requête
        const { searchParams } = new URL(request.url);
        const companyId = searchParams.get('companyId');

        if (!companyId) {
            return NextResponse.json({ success: false, message: 'Company ID is required' }, { status: 400 });
        }

        // Récupérer les membres associés à cette compagnie
        const members = await Member.find({ company: companyId }).populate('user');

        return NextResponse.json({ success: true, members });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Error retrieving members' }, { status: 500 });
    }
}
