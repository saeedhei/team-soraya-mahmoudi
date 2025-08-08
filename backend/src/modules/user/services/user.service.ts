// src/modules/user/services/user.service.ts
import { Service } from 'typedi';
import { UserModel } from '../entity/user.entity';

@Service()
export class UserService {
  async getUserById(_id: string) {
    return UserModel.findById(_id);
  }

  async verifyUserEmail(_id: string) {
    return UserModel.findByIdAndUpdate(_id, { isVerified: true }, { new: true });
  }
}
