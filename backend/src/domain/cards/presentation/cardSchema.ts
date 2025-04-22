import { gql } from 'graphql-tag';

export const cardTypeDefs = gql`
  type Translation {
    language: String!
    text: String!
  }

  type Card {
    id: ID!
    word: String!
    transcription: String
    translation: [Translation!]!
    example: [Translation!]
    audioUrl: String
    category: CategoryName!
    difficulty: Difficulty!
    createdAt: String!
    updatedAt: String!
  }

  enum CategoryName {
    verbs
    nouns
    adjectives
    adverbs
    pronouns
    prepositions
    conjunctions
    interjections
    phrases
  }

  enum Difficulty {
    easy
    medium
    hard
  }

  input TranslationInput {
    language: String!
    text: String!
  }

  type Query {
    getCards: [Card!]!
    getCardById(id: ID!): Card
    getCardsByCategory(category: CategoryName!): [Card!]!
  }

  type Mutation {
    createCard(
      word: String!
      transcription: String
      translation: [TranslationInput!]!
      example: [TranslationInput]
      audioUrl: String
      category: CategoryName!
      difficulty: Difficulty!
    ): Card!

    updateCard(
      id: ID!
      word: String
      transcription: String
      translation: [TranslationInput!]
      example: [TranslationInput!]
      audioUrl: String
      category: CategoryName
      difficulty: Difficulty
    ): Card!

    deleteCard(id: ID!): Card!
  }
`;
