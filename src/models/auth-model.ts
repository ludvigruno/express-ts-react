import { Schema, model } from 'mongoose';

// Auth users schema
export interface IAuthModel {
  username: string;
  email: string;
  password: string;
  created_at: Date;
}

const authSchema = new Schema<IAuthModel>({
  username: { type: String, unique: false, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  created_at: Date,
});

export const AuthModel = model<IAuthModel>('auth', authSchema);
