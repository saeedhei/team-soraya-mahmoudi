import { CardModel } from '../schemas/cardSchema.js';
import { Card } from '../models/card.js';

export const resolvers = {
  Query: {
    // Get all cards
    getCards: async (): Promise<Card[]> => {
      const cards = await CardModel.find().exec();
      return cards.map(Card.fromDocument);
    },

    // Get card by ID
    getCardById: async (_: any, { id }: { id: string }): Promise<Card | null> => {
      const cardDoc = await CardModel.findById(id).exec();
      return cardDoc ? Card.fromDocument(cardDoc) : null;
    },

    // Get cards by category
    getCardsByCategory: async (_: any, { category }: { category: string }): Promise<Card[]> => {
      const cards = await CardModel.find({ category }).exec();
      return cards.map(Card.fromDocument);
    },
  },

  Mutation: {
    // Create a card
    createCard: async (
      _: any,
      {
        word,
        transcription,
        translation,
        example,
        audioUrl,
        category,
        difficulty,
      }: {
        word: string;
        transcription?: string;
        translation?: { language: string; text: string }[];
        example?: { language: string; text: string }[];
        audioUrl?: string;
        category: string;
        difficulty: string;
      },
    ): Promise<Card> => {
      // Check if there is another word with the same meaning
      const existingCard = await CardModel.findOne({ word }).exec();
      if (existingCard) {
        throw new Error(`A card with the word "${word}" already exists!`);
      }

      const newCardDoc = new CardModel({
        word,
        transcription,
        translation: translation ?? [],
        example: example ?? [],
        audioUrl,
        category,
        difficulty,
      });

      await newCardDoc.save();
      return Card.fromDocument(newCardDoc);
    },

    // Update card
    updateCard: async (
      _: any,
      {
        id,
        word,
        transcription,
        translation,
        example,
        audioUrl,
        category,
        difficulty,
      }: {
        id: string;
        word?: string;
        transcription?: string;
        translation?: { language: string; text: string }[];
        example?: { language: string; text: string }[];
        audioUrl?: string;
        category?: string;
        difficulty?: string;
      },
    ): Promise<Card | null> => {
      if (word) {
        // Check if there is another word with the same meaning
        const existingCard = await CardModel.findOne({ word, _id: { $ne: id } }).exec();
        if (existingCard) {
          throw new Error(`A card with the word "${word}" already exists!`);
        }
      }

      const updatedCard = await CardModel.findByIdAndUpdate(
        id,
        { word, transcription, translation, example, audioUrl, category, difficulty },
        { new: true },
      ).exec();

      return updatedCard ? Card.fromDocument(updatedCard) : null;
    },

    // Delete card
    deleteCard: async (_: any, { id }: { id: string }): Promise<Card | null> => {
      const deletedCardDoc = await CardModel.findByIdAndDelete(id).exec();
      return deletedCardDoc ? Card.fromDocument(deletedCardDoc) : null;
    },
  },
};