import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  type User {
    id: ID!
    userName: String!
    email: String!
    firstName: String!
    lastName: String!
    phoneNumber: String
    role: String!
    languagePreferences: String!
    learningProgress: [LearningProgress!]!
  }

  type LearningProgress {
    cardId: ID!
    status: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User!]!
  }

  type Mutation {
    createUser(
      userName: String!
      email: String!
      firstName: String!
      lastName: String!
      password: String!
      role: String!
      languagePreferences: String!
    ): User!
  }
`;
