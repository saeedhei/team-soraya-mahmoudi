import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
  userName: string;
  password: string;
  email: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  languagePreferences: string; // Interface language FE
  learningProgress: { cardId: Types.ObjectId; status: 'learning' | 'learned' }[];
}

const userSchema = new Schema<IUser>(
  {
    userName: { type: String, required: true, trim: true, minlength: 4, maxlength: 20 },
    password: { type: String, required: true, trim: true, minlength: 8 },
    email: { type: String, required: true, trim: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    phoneNumber: { type: String, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    languagePreferences: { type: String, default: 'de' }, // Interface language
    learningProgress: [
      {
        cardId: { type: Schema.Types.ObjectId, ref: 'Card' },
        status: { type: String, enum: ['learning', 'learned'], default: 'learning' },
      },
    ],
  },
  { timestamps: true },
);

export const UserModel = model<IUser>('User', userSchema);
