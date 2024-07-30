import mongoose, { Document, Model, Schema, CallbackError } from "mongoose";
import Facture from "./facture.model"; // Assurez-vous que le chemin d'importation est correct
import Depense from "./depense.model"; // Assurez-vous que le chemin d'importation est correct

export interface CompagnieDocument extends Document {
  name: string;
  email: string;
  tel: string;
  address: string;
  factures: mongoose.Types.ObjectId[];
  depenses: mongoose.Types.ObjectId[];
  revenusTotals: number;
  depensesTotals: number;
  createdBy: mongoose.Types.ObjectId;
  timestamps: Date;
}

const CompagnieSchema = new Schema<CompagnieDocument>({
  name: { 
    type: String,
    required: true 
  },
  email: { 
    type: String,
    required: true 
  },
  tel: { 
    type: String,
    required: true 
  },
  address: { 
    type: String,
    required: true 
  },
  factures: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Facture', 
    required: false 
  }],
  depenses: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Depense', 
    required: false 
  }],
  revenusTotals: { 
    type: Number,
    required: false,
    default: 0 
  },
  depensesTotals: { 
    type: Number,
    required: false,
    default: 0 
  },
  createdBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  timestamps: { 
    type: Date, 
    default: Date.now 
  },
});


const Compagnie: Model<CompagnieDocument> = mongoose.models.Compagnie || mongoose.model<CompagnieDocument>("Compagnie", CompagnieSchema);

export default Compagnie;