import { Schema, model, Document } from 'mongoose';

type Translation = { language: string; text: string };

export interface ICard extends Document {
  word: string;
  transcription?: string;
  translation: Translation[];
  example?: Translation[];
  audioUrl?: string;
  category: CategoryName;
  difficulty: 'easy' | 'medium' | 'hard';
}

type CategoryName =
  | 'verbs'
  | 'nouns'
  | 'adjectives'
  | 'adverbs'
  | 'pronouns'
  | 'prepositions'
  | 'conjunctions'
  | 'interjections'
  | 'phrases';

const cardSchema = new Schema<ICard>(
  {
    word: { type: String, required: true, unique:true },
    transcription: { type: String },
    translation: {
      type: [{ language: String, text: String }],
      required: true,
    },
    example: {
      type: [{ language: String, text: String }],
    },
    audioUrl: { type: String },
    category: {
      type: String,
      enum: [
        'verbs',
        'nouns',
        'adjectives',
        'adverbs',
        'pronouns',
        'prepositions',
        'conjunctions',
        'interjections',
        'phrases',
      ],
      required: true,
    },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  },
  { timestamps: true },
);

export const CardModel = model<ICard>('Card', cardSchema);