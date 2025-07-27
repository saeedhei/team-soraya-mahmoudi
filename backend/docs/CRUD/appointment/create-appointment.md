# Create Appointment (Mutation)

This mutation allows an authenticated user (patient) to create an appointment with a doctor.

## Endpoint

POST http://localhost:3000/graphql


## Required Headers

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}

GraphQL Mutation
mutation {
  createAppointment(
    input: {
      doctorId: "688680b470ec8cbbf3112235",
      date: "2025-08-01",
      time: "10:00",
      notes: "Initial consultation"
    }
  ) {
    id
    date
    time
    status
  }
}

Example Response
{
  "data": {
    "createAppointment": {
      "id": "6886856c70ec8cbbf3112241",
      "date": "2025-08-01T00:00:00.000Z",
      "time": "10:00",
      "status": "PENDING"
    }
  }
}

Notes
The doctorId must belong to an existing user.

The patient is derived from the JWT token (ctx.user).

Default status is set to PENDING.