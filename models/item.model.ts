import { Schema, model, Document } from 'mongoose';

interface Item extends Document {
  name: string;
  quantity: number;
  prixUnitaire: number;
  timestamps: Date;
}

const ItemSchema = new Schema<Item>({
  name: { type: String,
     required: true },
  quantity: { type: Number,
     required: true },
  prixUnitaire: { type: Number,
     required: true },
  timestamps: { type: Date,
     default: Date.now },
});

const ItemModel = model<Item>('Item', ItemSchema);

export default ItemModel;
export type { Item };
