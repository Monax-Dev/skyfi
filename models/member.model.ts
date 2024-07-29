import mongoose, { Document, Model, Schema } from "mongoose";

export interface MemberDocument extends Document {
    user: mongoose.Schema.Types.ObjectId;
    compagnie: mongoose.Schema.Types.ObjectId;
    role: string;
    timestamps: Date;
}

const MemberSchema = new Schema<MemberDocument>({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User', 
         required: true },
    compagnie: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Compagnie',
         required: true },
    role: { 
        type: String,
        enum: ['admin', 'manager', 'employee'], 
        required: true },
    timestamps: { 
        type: Date,
        default: Date.now },
})

const Member: Model<MemberDocument> = mongoose.models.Member || mongoose.model<MemberDocument>("Member", MemberSchema);

export default Member;