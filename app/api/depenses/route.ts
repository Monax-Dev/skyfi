import { NextRequest, NextResponse } from 'next/server';
import Depense from '@/models/depense.model';
import Compagnie from '@/models/compagnie.model';
import { connectToDB } from '@/db/db';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { Types } from 'mongoose';

// Fonction pour gérer les requêtes POST
export async function POST(request: NextRequest) {
    try {
        // Connexion à la base de données
        await connectToDB();

        // Extraction des données du corps de la requête
        const reqBody = await request.json();
        const { name, montant, compagnieId } = reqBody;

        // Récupération des données utilisateur à partir du token d'authentification
        const userId = await getDataFromToken(request);

        // Vérification de l'existence de la compagnie
        const compagnie = await Compagnie.findById(compagnieId);
        if (!compagnie) {
            // Retourner une réponse d'erreur si la compagnie n'est pas trouvée
            return NextResponse.json({ success: false, message: 'Company not found' }, { status: 404 });
        }

        // Création d'une nouvelle dépense
        const newDepense = new Depense({
            name,
            montant,
            compagnie: compagnieId,
            createdBy: userId
        });

        // Sauvegarde de la nouvelle dépense dans la base de données
        const savedDepense = await newDepense.save();

        // Ajout de l'ID de la nouvelle dépense à la liste des dépenses de la compagnie
        compagnie.depenses.push(savedDepense._id as Types.ObjectId);
        // Réinitialiser les dépenses totales
        const depenses = await Depense.find({ _id: { $in: compagnie.depenses } }).exec();
        compagnie.depensesTotals = depenses.reduce((sum, depense) => sum + depense.montant, 0);

        await compagnie.save();



        // Retourner une réponse de succès avec la dépense sauvegardée
        return NextResponse.json({ success: true, depense: savedDepense });
    } catch (error) {
        // Gestion des erreurs et retour d'une réponse d'erreur
        console.error(error);
        return NextResponse.json({ success: false, message: 'Error adding expense' }, { status: 500 });
    }
}

// Fonction pour gérer les requêtes GET
export async function GET(request: NextRequest) {
    try {
        // Connexion à la base de données
        await connectToDB();
        const userId = await getDataFromToken(request);
        // Extraction des paramètres de recherche de l'URL
        const url = new URL(request.url);
        const compagnieId = url.searchParams.get('compagnieId');
        // Vérification si l'ID de la compagnie est fourni
        if (!compagnieId) {
            // Retourner une réponse d'erreur si l'ID de la compagnie est manquant
            return NextResponse.json({ success: false, message: 'Company ID is required' }, { status: 400 });
        }

        // Vérification de l'existence de la compagnie
        const compagnie = await Compagnie.findById(compagnieId);
        if (!compagnie) {
            // Retourner une réponse d'erreur si la compagnie n'est pas trouvée
            return NextResponse.json({ success: false, message: 'Company not found' }, { status: 404 });
        }

        if (compagnie.createdBy.toString() !== userId) {
            return NextResponse.json({ success: false, message: 'Accès non autorisé' }, { status: 403 });
        }

        // Récupération des dépenses associées à la compagnie
        const depenses = await Depense.find({ _id: { $in: compagnie.depenses } });

        // Retourner une réponse de succès avec les dépenses récupérées
        return NextResponse.json({ success: true, depenses });
    } catch (error) {
        // Gestion des erreurs et retour d'une réponse d'erreur
        console.error(error);
        return NextResponse.json({ success: false, message: 'Error retrieving expenses' }, { status: 500 });
    }
}
