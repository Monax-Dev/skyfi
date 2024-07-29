import mongoose, { Document, Model, Schema } from "mongoose";

export interface CompagnieDocument extends Document {
  name: string;
  email: string;
  tel: string;
  address: string;
  Revenus: number;
  factures: mongoose.Types.ObjectId[];
  depenses: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  timestamps: Date;
}

const CompagnieSchema = new Schema<CompagnieDocument>({
  name: { 
    type: String,
    required: true },
  email: { 
    type: String,
    required: true },
  tel: { 
    type: String,
    required: true },
  address: { 
    type: String,
    required: true },
    Revenus: { 
    type: Number,
    required: false, default: 0 },
  factures: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Facture', required: false }],
  depenses: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Depense', required: false }],
  createdBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', required: true },
  timestamps: { 
    type: Date, 
    default: Date.now },
});

const Compagnie: Model<CompagnieDocument> = mongoose.models.Compagnie || mongoose.model<CompagnieDocument>("Compagnie", CompagnieSchema);

export default Compagnie;
