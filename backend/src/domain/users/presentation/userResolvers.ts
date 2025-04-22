import { UserModel, IUser } from '../schemas/userSchema.js'; // Import Mongoose model
import { User } from '../models/user.js'; // Import domain model (User)

export const resolvers = {
  Query: {
    getUser: async (_: any, { id }: { id: string }): Promise<User | null> => {
      // Use Mongoose to find the user by ID
      const userDoc = await UserModel.findById(id).exec();
      return userDoc ? User.fromMongoDocument(userDoc) : null;
    },
    getUsers: async (): Promise<User[]> => {
      // Fetch all users and map them to domain models
      const users = await UserModel.find().exec();
      return users.map((userDoc) => User.fromMongoDocument(userDoc));
    },
  },
  Mutation: {
    createUser: async (_: any, args: IUser): Promise<User> => {
      // Create new Mongoose document
      const userDoc = new UserModel(args);
      await userDoc.save();
      // Return domain User object
      return User.fromMongoDocument(userDoc);
    },
  },
};
