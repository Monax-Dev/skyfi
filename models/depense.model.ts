import mongoose, { Document, Model, Schema } from "mongoose";

export interface DepenseDocument extends Document {
  name: string;
  totalAPayer: number;
  timestamps: Date;
  isPaid: boolean;
}

const DepenseSchema = new Schema<DepenseDocument>({
  name:{
  type: String,
  required: true,
  },
  totalAPayer: { 
    type: Number,
    required: true },
  timestamps: { 
    type: Date,
    default: Date.now },
  isPaid: { 
    type: Boolean,
     default: false },
});

const Depense: Model<DepenseDocument> = mongoose.models.Depense || mongoose.model<DepenseDocument>("Depense", DepenseSchema);

export default Depense;
