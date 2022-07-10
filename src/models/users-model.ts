import { Schema, model, Types } from 'mongoose';

// User schema
export interface IUserModel {
  name: string;
  surname: string;
  username: string;
  email: string;
  avatar?: string;
  age?: number;
  userAuthId: Types.ObjectId;
  created_at: Date;
}

const userSchema = new Schema<IUserModel>({
  name: { type: String, unique: false, required: false, default: '' },
  surname: { type: String, unique: false, required: false, default: '' },
  username: { type: String, unique: false, required: true },
  email: { type: String, unique: true, required: true },
  avatar: { type: String, unique: false, required: false },
  age: { type: Number, unique: false, required: false },
  userAuthId: { type: Schema.Types.ObjectId, ref: 'auth' },
  created_at: Date,
});

export const UserModel = model<IUserModel>('user', userSchema);
