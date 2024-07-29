import { NextRequest, NextResponse } from 'next/server';
import Depense from '@/models/depense.model';
import Compagnie from '@/models/compagnie.model';
import { connectToDB } from '@/db/db';

// Fonction pour gérer les requêtes PUT
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Connexion à la base de données
        await connectToDB();

        // Extraction des données du corps de la requête
        const reqBody = await request.json();
        const { name, amount, date } = reqBody;
        const { id } = params;

        // Mise à jour de la dépense par ID
        const updatedDepense = await Depense.findByIdAndUpdate(id, { name, amount, date }, { new: true });
        if (!updatedDepense) {
            // Retourner une réponse d'erreur si la dépense n'est pas trouvée
            return NextResponse.json({ success: false, message: 'Expense not found' }, { status: 404 });
        }

        // Retourner une réponse de succès avec la dépense mise à jour
        return NextResponse.json({ success: true, depense: updatedDepense });
    } catch (error) {
        // Gestion des erreurs et retour d'une réponse d'erreur
        console.error(error);
        return NextResponse.json({ success: false, message: 'Error updating expense' }, { status: 500 });
    }
}

// Fonction pour gérer les requêtes DELETE
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Connexion à la base de données
        await connectToDB();

        const { id } = params;

        // Recherche de la dépense par ID
        const depense = await Depense.findById(id);
        if (!depense) {
            // Retourner une réponse d'erreur si la dépense n'est pas trouvée
            return NextResponse.json({ success: false, message: 'Expense not found' }, { status: 404 });
        }

        // Suppression de la dépense par ID
        await Depense.findByIdAndDelete(id);

        // Mise à jour de la compagnie pour retirer l'ID de la dépense supprimée
        await Compagnie.findByIdAndUpdate(depense.compagnie, { $pull: { depenses: id } });

        // Retourner une réponse de succès avec un message de confirmation
        return NextResponse.json({ success: true, message: 'Expense removed' });
    } catch (error) {
        // Gestion des erreurs et retour d'une réponse d'erreur
        console.error(error);
        return NextResponse.json({ success: false, message: 'Error removing expense' }, { status: 500 });
    }
}
