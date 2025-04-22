import { Types } from 'mongoose';
import { IUser } from '../schemas/userSchema.js';
export class User {
  constructor(
    public id: string,
    public userName: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public password: string,
    public phoneNumber?: string,
    public role: 'admin' | 'user' = 'user',
    public languagePreferences: string = 'de',
    public learningProgress: { cardId: string; status: 'learning' | 'learned' }[] = [],
  ) {}

  static fromMongoDocument(userDoc: IUser): User {
    return new User(
      userDoc.id,
      userDoc.userName,
      userDoc.email,
      userDoc.firstName,
      userDoc.lastName,
      userDoc.password,
      userDoc.phoneNumber,
      userDoc.role,
      userDoc.languagePreferences,
      userDoc.learningProgress.map(
        (progress: { cardId: Types.ObjectId; status: 'learning' | 'learned' }) => ({
          cardId: progress.cardId.toString(), 
          status: progress.status,
        }),
      ),
    );
  }

  changeEmail(newEmail: string) {
    if (!newEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error('Invalid email format');
    }
    this.email = newEmail;
  }

  changePassword(newPassword: string) {
    if (newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    this.password = newPassword;
  }
}
