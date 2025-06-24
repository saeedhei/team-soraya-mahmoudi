import { gql } from "@apollo/client";

export const CONFIRM_APPOINTMENT = gql`
  mutation ConfirmAppointment($appointmentId: ID!) {
    confirmAppointment(appointmentId: $appointmentId) {
      id
      status
    }
  }
`;

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($input: CreateAppointmentInput!) {
    createAppointment(input: $input) {
      userErrors {
        message
      }
      appointment {
        id
        date
        status
      }
    }
  }
`;