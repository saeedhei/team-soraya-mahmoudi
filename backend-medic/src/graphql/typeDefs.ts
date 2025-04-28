import { gql } from "graphql-tag";

export const userTypeDefs= gql `
  type User{
    id:ID!
    username: String!
    email: String!
    creatAt: String!
    updateAt: String!
  }
  type AuthPayload{
    token: String!
    user: User!
  }

  type Query{
    me: User!
  }

  type Mutation{
    signup( username:String!, email:String!, password: String!): AuthPayload!
    login(email:String!, password:String!): AuthPayload!
  }
`
;