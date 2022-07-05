import { Schema, model } from 'mongoose';

// Auth user schema
export interface IAuthModel {
  email: string;
  password: string;
  created_at: Date;
}

const authSchema = new Schema<IAuthModel>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  created_at: Date,
});

export const AuthModel = model<IAuthModel>('auth', authSchema);
