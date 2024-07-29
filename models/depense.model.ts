import mongoose, { Document, Model, Schema } from "mongoose";

export interface DepenseDocument extends Document {
  name: string;
  montant: number;
  compagnie: mongoose.Schema.Types.ObjectId;
  createdBy: mongoose.Schema.Types.ObjectId;
  timestamps: Date;
}

const DepenseSchema = new Schema<DepenseDocument>({
  name:{
  type: String,
  required: true,
  },
  montant: { 
    type: Number,
    required: true },
  compagnie:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Compagnie', 
    required: true
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  timestamps: { 
    type: Date,
    default: Date.now },
});

const Depense: Model<DepenseDocument> = mongoose.models.Depense || mongoose.model<DepenseDocument>("Depense", DepenseSchema);

export default Depense;
