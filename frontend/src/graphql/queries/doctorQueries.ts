import { gql } from '@apollo/client';

export const GET_DOCTOR_APPOINTMENTS = gql`
  query GetDoctorAppointments {
    getAppointmentsForDoctor {
      _id
      date
      time
      status
      notes
      doctor {
        _id
        email
      }
      patient {
        _id
        email
      }
    }
  }
`;
