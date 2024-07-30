import Facture from "@/models/facture.model";
import Compagnie from "@/models/compagnie.model";
import { connectToDB } from "@/db/db";
import { NextRequest, NextResponse } from 'next/server';

// Fonction PUT pour mettre à jour une facture
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const factureId = params.id; // ID de la facture à mettre à jour
        const reqBody = await request.json();
        const { name, items, isPaid } = reqBody;

        await connectToDB();

        // Trouver et mettre à jour la facture
        const facture = await Facture.findById(factureId);
        if (!facture) {
            return NextResponse.json({ success: false, message: 'Facture non trouvée' }, { status: 404 });
        }

        // Mettre à jour les détails de la facture
        facture.name = name || facture.name;
        facture.items = items || facture.items;
        facture.totalAPayer = items ? items.reduce((acc: number, item: { quantity: number, prixUnitaire: number }) => acc + (item.quantity * item.prixUnitaire), 0) : facture.totalAPayer;
        facture.isPaid = isPaid !== undefined ? isPaid : facture.isPaid;

        const updatedFacture = await facture.save();

        // Réinitialiser les revenus totaux en cas de mise à jour
        const compagnie = await Compagnie.findOne({ factures: factureId }).populate('factures').exec();
        if (compagnie) {
            const factures = await Facture.find({ _id: { $in: compagnie.factures } }).exec();
            const revenusTotals = factures.reduce((sum, facture) => facture.isPaid ? sum + facture.totalAPayer : sum, 0);
            compagnie.revenusTotals = revenusTotals;
            await compagnie.save(); // Mettre à jour les revenus totaux de la compagnie
        }

        return NextResponse.json({ success: true, facture: updatedFacture });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Erreur lors de la mise à jour de la facture' }, { status: 500 });
    }
}

// Fonction DELETE pour supprimer une facture
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const factureId = params.id; // ID de la facture à supprimer

        await connectToDB();

        // Trouver et supprimer la facture
        const facture = await Facture.findById(factureId);
        if (!facture) {
            return NextResponse.json({ success: false, message: 'Facture non trouvée' }, { status: 404 });
        }

        // Supprimer la facture
        await Facture.findByIdAndDelete(factureId);

        // Mettre à jour la compagnie associée
        const compagnie = await Compagnie.findOne({ factures: factureId }).populate('factures').exec();
        if (compagnie) {
            // Retirer l'ID de la facture supprimée de la liste des factures
            compagnie.factures = compagnie.factures.filter(facture => !facture._id.equals(factureId));
            await compagnie.save();

            // Réinitialiser les revenus totaux en cas de suppression
            const factures = await Facture.find({ _id: { $in: compagnie.factures } }).exec();
            const revenusTotals = factures.reduce((sum, facture) => facture.isPaid ? sum + facture.totalAPayer : sum, 0);
            compagnie.revenusTotals = revenusTotals;
            await compagnie.save(); // Mettre à jour les revenus totaux de la compagnie
        }

        return NextResponse.json({ success: true, message: 'Facture supprimée avec succès' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Erreur lors de la suppression de la facture' }, { status: 500 });
    }
}
