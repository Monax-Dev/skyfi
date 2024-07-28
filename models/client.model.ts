import mongoose, { Document, Model, Schema } from "mongoose";

export interface ClientDocument extends Document {
  name: string;
  email: string;
  tel: string;
  address: string;
}

const ClientSchema = new Schema<ClientDocument>({
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
});

const Client: Model<ClientDocument> = mongoose.models.Client || mongoose.model<ClientDocument>("Client", ClientSchema);

export default Client;
