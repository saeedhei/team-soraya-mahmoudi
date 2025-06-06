import {gql} from "graphql-tag";

export const appointmentTypeDefs = gql`

  type Appointment {
    id: ID!
    doctor: ID!
    patient: ID!
    date: String!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  type Mutation{
    confirmAppointment(appointmentId: ID!):Appointment!
  }
`;