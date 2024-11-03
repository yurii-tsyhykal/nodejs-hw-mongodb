import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createUserSchema,
  loginUserSchema,
  sendResetEmail,
} from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  refreshUsersSessionController,
  registerUserController,
  sendResetEmailController,
} from '../controllers/auth.js';
import { authenticate } from '../middlewares/authenticate.js';

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
router.use(authenticate);
router.post(
  '/send-reset-email',
  validateBody(sendResetEmail),
  ctrlWrapper(sendResetEmailController),
);
export default router;
