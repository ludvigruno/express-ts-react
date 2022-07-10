import { Schema, model } from 'mongoose';

// Auth user schema
export interface IUserAuthModel {
  email: string;
  password: string;
  isVerified: boolean;
  verifiedLink: string;
  created_at: Date;
}

const userAuthSchema = new Schema<IUserAuthModel>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verifiedLink: { type: String },
  created_at: Date,
});

export const UserAuthModel = model<IUserAuthModel>('auth', userAuthSchema);
