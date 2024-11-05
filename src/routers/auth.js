import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createUserSchema,
  loginUserSchema,
  resetPasswordSchema,
  sendResetEmailSchema,
} from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  refreshUsersSessionController,
  registerUserController,
  resetPasswordController,
  sendResetEmailController,
} from '../controllers/auth.js';

const router = express.Router();
router.post(
  '/register',
  validateBody(createUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/refresh', ctrlWrapper(refreshUsersSessionController));
router.post('/logout', ctrlWrapper(logoutUserController));
router.post(
  '/send-reset-email',
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailController),
);
router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);
export default router;
