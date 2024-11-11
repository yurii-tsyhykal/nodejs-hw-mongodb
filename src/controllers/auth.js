import {
  loginUser,
  logoutUser,
  refreshUsersSession,
  registerUser,
  resetPassword,
  sendResetEmail,
} from '../services/auth.js';
import { setupSession } from '../utils/setupSession.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);
  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshUsersSessionController = async (req, res) => {
  const newSession = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  setupSession(res, newSession);
  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: newSession.accessToken },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');
  }
  res.sendStatus(204);
};

export const sendResetEmailController = async (req, res) => {
  await sendResetEmail(req.body.email);
  res.json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};
