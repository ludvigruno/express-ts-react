import { Schema, model, Types } from 'mongoose';

// Token user schema
export interface ITokenModel {
  userAuthId: Types.ObjectId;
  refreshToken: string;
  created_at: Date;
}

const tokenSchema = new Schema<ITokenModel>({
  userAuthId: { type: Schema.Types.ObjectId, ref: 'auth' },
  refreshToken: { type: String, required: true },
  created_at: Date,
});

export const TokenModel = model<ITokenModel>('token', tokenSchema);
