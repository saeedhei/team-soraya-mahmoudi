// src/modules/user/services/user.service.ts
import { Service } from 'typedi';
import { UserModel } from '../entity/user.entity';

@Service()
export class UserService {
  async getUserById(id: string) {
    return UserModel.findById(id);
  }

  async verifyUserEmail(id: string) {
    return UserModel.findByIdAndUpdate(id, { isVerified: true }, { new: true });
  }
}
