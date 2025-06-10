mutation {
  signup(
    username: "john_doe"
    email: "john@example.com"
    password: "MySecure!123"
    role: "patient"
  ) {
    token
    user {
      id
      username
      email
      role
    }
  }
}
