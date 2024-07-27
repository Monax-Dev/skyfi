import mongoose, { Document, Model, Schema } from "mongoose";

export interface CompagnieDocument extends Document {
  name: string;
  email: string;
  tel: string;
  address: string;
  chiffreAffaires: number;
  createdBy: mongoose.Types.ObjectId;
  timestamps: Date;
}

const CompagnieSchema = new Schema<CompagnieDocument>({
  name: { type: String,
    required: true },
  email: { type: String,
    required: true },
  tel: { type: String,
    required: true },
  address: { type: String,
    required: true },
  chiffreAffaires: { 
    type: Number,
    required: false,
    default:0
   },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  timestamps: { type: Date,
    default: Date.now },
});

const Compagnie: Model<CompagnieDocument> = mongoose.models.Compagnie || mongoose.model<CompagnieDocument>("Compagnie", CompagnieSchema);

export default Compagnie;
