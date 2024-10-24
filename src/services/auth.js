import createHttpError from 'http-errors';
import { userCollection } from '../models/user.js';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { sessionCollection } from '../models/session.js';
import { FIFTEEN_MINUTES, THIRTY_DAY } from '../constants/index.js';

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
  console.log(isUser);

  if (!isUser) {
    throw createHttpError(401, 'User not found');
  }
  const isPassword = bcrypt.compare(userData.password, isUser.password);
  console.log(isPassword);
  if (!isPassword) {
    throw createHttpError(401, 'Unauthorized');
  }

  await sessionCollection.deleteOne({ userId: isUser._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await sessionCollection.create({
    userId: isUser._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY),
  });
};
