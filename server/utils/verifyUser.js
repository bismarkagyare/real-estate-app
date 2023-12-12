import jwt from 'jsonwebtoken';
import { errorhandler } from './error.js';

export const verifyToken = (res, req, next) => {
  const token = req.cookie.access_token;

  if (!token) return next(errorhandler(401, 'Unauthorized access'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorhandler(403, 'Forbidden'));

    req.user = user;
    next();
  });
};
