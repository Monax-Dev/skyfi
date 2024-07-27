import { Schema, model, Document } from 'mongoose';

interface Compagnie extends Document {
  name: string;
  email: string;
  tel: string;
  address: string;
  chiffreAffaires: string;
  timestamps: Date;
}

const CompagnieSchema = new Schema<Compagnie>({
  name: { type: String,
    required: true },
  email: { type: String,
    required: true },
  tel: { type: String,
    required: true },
  address: { type: String,
    required: true },
  chiffreAffaires: { type: String,
    required: true },
  timestamps: { type: Date,
    default: Date.now },
});

const CompagnieModel = model<Compagnie>('Compagnie', CompagnieSchema);

export default CompagnieModel;
export type { Compagnie };
