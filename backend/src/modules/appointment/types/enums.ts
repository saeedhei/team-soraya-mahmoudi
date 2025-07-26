// src/modules/appointment/types/enums.ts
import { registerEnumType } from 'type-graphql';

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

registerEnumType(AppointmentStatus, {
  name: 'AppointmentStatus',
});
