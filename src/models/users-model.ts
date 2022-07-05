import { Schema, model } from 'mongoose';

// User schema
export interface IUserModel {
  name: string;
  surname: string;
  username: string;
  email: string;
  avatar?: string;
  age?: number;
  created_at: Date;
}

const userSchema = new Schema<IUserModel>({
  name: { type: String, unique: false, required: true },
  surname: { type: String, unique: false, required: true },
  username: { type: String, unique: false, required: true },
  email: { type: String, unique: true, required: true },
  avatar: { type: String, unique: false, required: false },
  age: { type: Number, unique: false, required: false },
  created_at: Date,
});

export const UserModel = model<IUserModel>('users', userSchema);
