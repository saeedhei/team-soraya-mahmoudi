mutation Register {
  register(data: { email: "user@example.com", password: "test1234" }) {
    _id
    email
    isVerified
  }
}