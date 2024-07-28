import mongoose, { Document, Model, Schema } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  password: string;
  email: string;
  tel: number;
  isAdmin: boolean;
  compagnies: mongoose.Schema.Types.ObjectId[];
  timestamps: Date;
}

const UserSchema = new Schema<UserDocument>({
  username: { 
      type: String,
      required: true },
  password: { 
    type: String,
    required: true },
  email: { 
    type: String,
    required: true },
  tel: { 
    type: Number, 
    required: true },
  isAdmin: { 
    type: Boolean,
    default: false },
  compagnies: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Compagnie',
    required: true }],
  timestamps: { 
    type: Date, 
    default: Date.now },
});


const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default User;

