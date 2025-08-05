import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
mutation Signup($data: RegisterInput!) {
  register(data: $data) {
    _id
    role
    isVerified
  }
}
`;

export const LOGIN_MUTATION = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
      user {
        _id
        email
        role
      }
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data)
  }
`;
