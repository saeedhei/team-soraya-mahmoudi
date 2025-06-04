/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import passport from '../config/passport';

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) =>{
    passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
    if (err || !user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = user;
      next();
    })(req, res, next);
}