import express from 'express';
import authRouter from './auth.js';
import contactsRouter from './contacts.js';
const router = express.Router();

router.use(authRouter);
router.use(contactsRouter);

export default router;
