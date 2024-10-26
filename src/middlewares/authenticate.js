import createHttpError from 'http-errors';
import { sessionCollection } from '../db/models/session.js';
import { userCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const AuthHeader = req.get('Authorization');

  if (!AuthHeader) {
    return next(createHttpError(401, 'Provide Authorization header'));
  }

  const bearer = AuthHeader.split(' ')[0];
  const token = AuthHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Auth header should be of type Bearer'));
  }
  const session = await sessionCollection.findOne({ accessToken: token });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await userCollection.findById(session.userId);
  if (!user) {
    return next(createHttpError(404, 'User not found'));
  }

  req.user = user;
  next();
};
