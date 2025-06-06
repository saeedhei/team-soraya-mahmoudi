import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

// User Module
import { userTypeDefs } from '../modules/user/graphql/user.typeDefs';
import { userResolvers } from '../modules/user/graphql/user.resolver';

// Appointment Module
import { appointmentTypeDefs } from '../modules/appointment/graphql/appointment.typeDefs';
import { appointmentResolvers } from '../modules/appointment/graphql/appointment.resolver';

// Combine all typeDefs and resolvers
export const typeDefs = mergeTypeDefs([userTypeDefs, appointmentTypeDefs]);
export const resolvers = mergeResolvers([userResolvers, appointmentResolvers]);
