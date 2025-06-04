import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import { User } from "../modules/user/models/user.model";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (jwt_payload: { id: string }, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.error("JWT Authentication Error:", err);
      return done(err, false);
    }
  })
);
export default passport;
