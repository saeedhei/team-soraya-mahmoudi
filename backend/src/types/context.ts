// backend/src/types/context.ts

import { User } from "@/modules/user/entity/user.entity";

export interface AppContext {
  user: User | null;
}
