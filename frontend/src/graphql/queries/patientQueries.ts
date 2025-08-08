import { gql } from '@apollo/client';

export const GET_PATIENT_APPOINTMENTS = gql`
  query GetAppointmentsForPatient {
    getAppointmentsForPatient {
      id
      doctor {
        email
      }
      date
      time
      status
      notes
    }
  }
`;
