// import { Query } from './resolvers/users/query.js';
// import { Mutation } from './resolvers/users/mutation.js';
// import { User } from './resolvers/users/user.js';

// export const resolvers = {
//   Query,
//   Mutation,
//   User,
// };
import {resolvers as userResolvers } from '../domain/users/presentation/userResolvers.js'; 
import { resolvers  as cardResolvers } from '../domain/cards/presentation/cardResolvers.js'; 
import { mergeResolvers } from '@graphql-tools/merge';

export const resolvers = mergeResolvers([userResolvers, cardResolvers]);