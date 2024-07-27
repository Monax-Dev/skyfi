import mongoose, { Document, Model, Schema } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  password: string;
  email: string;
  tel: number;
  isAdmin: boolean;
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
  timestamps: { 
    type: Date, 
    default: Date.now },
});


const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default User;

