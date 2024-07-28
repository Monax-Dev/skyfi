import { Schema, model, Document } from 'mongoose';

interface Client extends Document {
  name: string;
  email: string;
  tel: string;
  address: string;
}

const ClientSchema = new Schema<Client>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  tel: { type: String, required: true },
  address: { type: String, required: true },
});

const ClientModel = model<Client>('Client', ClientSchema);

export default ClientModel;
export type { Client };
