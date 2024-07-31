import mongoose, { Document, Model, Schema, CallbackError } from "mongoose";
import Facture from "./facture.model";
import Depense from "./depense.model";
import Client from "./client.model";

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
  clients: mongoose.Types.ObjectId[];
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
  clients: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Client', 
    required: false 
  }],
  timestamps: { 
    type: Date, 
    default: Date.now 
  },
});

// Middleware pour supprimer les factures et les dépenses associées à une compagnie
CompagnieSchema.pre('findOneAndDelete', async function(next) {
  const compagnie = this;
  try {
    await Facture.deleteMany({ _id: { $in: compagnie.getFilter().factures } });
    await Depense.deleteMany({ _id: { $in: compagnie.getFilter().depenses } });
    next();
  } catch (error: unknown) {
    next(error as CallbackError);
  }
});

const Compagnie: Model<CompagnieDocument> = mongoose.models.Compagnie || mongoose.model<CompagnieDocument>("Compagnie", CompagnieSchema);

export default Compagnie;
