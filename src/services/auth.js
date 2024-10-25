import createHttpError from 'http-errors';
import { userCollection } from '../models/user.js';
import bcrypt from 'bcrypt';
import { sessionCollection } from '../models/session.js';
import { createTokensForSession } from '../utils/createTokensForSession.js';

export const registerUser = async (newUserData) => {
  const user = await userCollection.findOne({ email: newUserData.email });
  if (user) {
    throw createHttpError(409, `Email in use`);
  }
  const encryptedPassword = await bcrypt.hash(newUserData.password, 10);
  return await userCollection.create({
    ...newUserData,
    password: encryptedPassword,
  });
};

export const loginUser = async (userData) => {
  const isUser = await userCollection.findOne({ email: userData.email });

  if (!isUser) {
    throw createHttpError(401, 'User not found');
  }
  const isPassword = bcrypt.compare(userData.password, isUser.password);
  if (!isPassword) {
    throw createHttpError(401, 'Unauthorized');
  }

  await sessionCollection.deleteOne({ userId: isUser._id });

  const newSession = createTokensForSession();

  return await sessionCollection.create({
    userId: isUser._id,
    ...newSession,
  });
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await sessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isRefreshTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isRefreshTokenExpired) {
    throw createHttpError(401, 'Session is expired');
  }

  await sessionCollection.deleteOne({
    _id: sessionId,
    refreshToken,
  });
  const newSession = createTokensForSession();

  return await sessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};
