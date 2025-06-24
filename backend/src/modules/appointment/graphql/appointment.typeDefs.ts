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
  
  input CreateAppointmentInput {
    doctorId: ID!
    date: String!
    notes: String
  }
  
  type CreateAppointmentPayload {
    appointment: Appointment
    userErrors: [UserError!]
  }
  
  type UserError {
    message: String!
  }
  
  type Mutation{
    confirmAppointment(appointmentId: ID!):Appointment!
    createAppointment(input: CreateAppointmentInput!): CreateAppointmentPayload!
  }
`;