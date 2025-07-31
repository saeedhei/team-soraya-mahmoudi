# Confirm Appointment (Mutation)

This mutation allows authenticated users to confirm an existing appointment.

## Endpoint

POST http://localhost:3000/graphql


## Required Headers

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}

GraphQL Mutation
graphql

mutation {
  confirmAppointment(appointmentId: "6886856c70ec8cbbf3112241") {
    id
    status
    date
    time
  }
}
Example Response
{
  "data": {
    "confirmAppointment": {
      "id": "6886856c70ec8cbbf3112241",
      "status": "CONFIRMED",
      "date": "2025-08-01T00:00:00.000Z",
      "time": "10:00"
    }
  }
}
Notes
Appointment must exist beforehand.

Only authenticated users can perform this action.

Appointment status will be updated from PENDING to CONFIRMED.