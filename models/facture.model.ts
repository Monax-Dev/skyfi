import { Schema, model, Document } from 'mongoose';

interface Facture extends Document {
  items: string[];
  totalAPayer: number;
  timestamps: Date;
  isPaid: boolean;
}

const FactureSchema = new Schema<Facture>({
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  totalAPayer: { type: Number, required: true },
  timestamps: { type: Date, default: Date.now },
  isPaid: { type: Boolean, default: false },
});

const FactureModel = model<Facture>('Facture', FactureSchema);

export default FactureModel;
export type { Facture };
