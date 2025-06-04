import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { userTypeDefs } from '../modules/user/graphql/user.typeDefs';
import { userResolvers } from '../modules/user/graphql/user.resolver';
import { appointmentTypeDefs } from '../modules/appointment/graphql/appointment.typeDefs';
import { appointmentResolvers } from '../modules/appointment/graphql/appointment.resolver';

export const typeDefs = mergeTypeDefs([userTypeDefs, appointmentTypeDefs]);
export const resolvers = mergeResolvers([userResolvers, appointmentResolvers]);