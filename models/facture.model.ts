import mongoose, { Document, Model, Schema } from "mongoose";

// Définir l'interface pour les sous-documents Item
interface Item extends Document {
  name: string;
  quantity: number;
  prixUnitaire: number;
  timestamps: Date;
}

// Créer le schéma pour les sous-documents Item
const ItemSchema = new Schema<Item>({
  name: { 
    type: String,
    required: true 
  },
  quantity: { 
    type: Number,
    required: true 
  },
  prixUnitaire: { 
    type: Number,
    required: true 
  },
  timestamps: { 
    type: Date,
    default: Date.now 
  },
});

// Définir l'interface pour le document Facture
export interface FactureDocument extends Document {
  items: Item[];
  totalAPayer: number;
  timestamps: Date;
  isPaid: boolean;
}

// Créer le schéma pour Facture avec les sous-documents Item
const FactureSchema = new Schema<FactureDocument>({
  items: [ItemSchema],
  totalAPayer: { 
    type: Number,
    required: true 
  },
  timestamps: { 
    type: Date,
    default: Date.now 
  },
  isPaid: { 
    type: Boolean,
    default: false 
  },
});

const Facture: Model<FactureDocument> = mongoose.models.Facture || mongoose.model<FactureDocument>("Facture", FactureSchema);

export default Facture;
