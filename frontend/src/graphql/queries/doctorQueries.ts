import { gql } from "@apollo/client";

export const GET_DOCTORS = gql`
  query GetDoctors {
    getDoctors {
      id
      username
      email
      specialization
    }
  }
`;
