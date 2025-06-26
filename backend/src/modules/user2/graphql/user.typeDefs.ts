import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input ChangePasswordInput {
    currentPassword: String!
    newPassword: String!
  }

  type ChangePasswordPayload {
    success: Boolean!
    message: String!
  }

  type Query {
    me: User!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!, role: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    forgotPassword(email: String!): String!
    changePassword(id: ID!, input: ChangePasswordInput!): ChangePasswordPayload!
  }
`;
