import { Schema, model, Document } from 'mongoose';

interface Depense extends Document {
  items: string[];
  totalAPayer: number;
  timestamps: Date;
  isPaid: boolean;
}

const DepenseSchema = new Schema<Depense>({
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  totalAPayer: { type: Number, required: true },
  timestamps: { type: Date, default: Date.now },
  isPaid: { type: Boolean, default: false },
});

const DepenseModel = model<Depense>('Depense', DepenseSchema);

export default DepenseModel;
export type { Depense };
