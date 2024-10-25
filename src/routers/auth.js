import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createUserSchema, loginUserSchema } from '../validation/auth.js';
import {
  loginUserController,
  refreshUsersSessionController,
  registerUserController,
} from '../controllers/auth.js';

const router = express.Router();
router.post(
  '/auth/register',
  validateBody(createUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/auth/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/auth/refresh', ctrlWrapper(refreshUsersSessionController));
export default router;
