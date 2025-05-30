import { gql } from "@apollo/client";

export const CONFIRM_APPOINTMENT = gql`
  mutation ConfirmAppointment($appointmentId: ID!) {
    confirmAppointment(appointmentId: $appointmentId) {
      id
      status
    }
  }
`;