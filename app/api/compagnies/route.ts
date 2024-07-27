import Compagnie from "@/models/compagnie.model";
import User from "@/models/user.model";
import { connectToDB } from "@/db/db";
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromToken';

// Fonction POST pour créer une compagnie
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, email, tel, address, chiffreAffaires } = reqBody;

        await connectToDB();

        const userId = await getDataFromToken(request); // Obtenez l'ID de l'utilisateur à partir du token

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const existingCompagnie = await Compagnie.findOne({ email });

        if (existingCompagnie) {
            return NextResponse.json({ error: 'Company Already Exists' }, { status: 400 });
        }

        const newCompagnie = new Compagnie({
            name,
            email,
            tel,
            address,
            chiffreAffaires,
        });

        const savedCompagnie = await newCompagnie.save();

        // Ajouter l'ID de la compagnie à l'utilisateur
        await User.findByIdAndUpdate(userId, { $push: { compagnies: savedCompagnie._id } });

        return NextResponse.json({
            message: "Company created successfully",
            success: true,
            savedCompagnie
        });

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Fonction GET pour récupérer toutes les compagnies
export async function GET(request: NextRequest) {
    try {
        await connectToDB();

        const compagnies = await Compagnie.find();

        return NextResponse.json({
            success: true,
            compagnies
        });

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
