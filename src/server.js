import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contact.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res, next) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.get('/contacts', async (req, res, next) => {
    const contactsData = await getAllContacts();

    return res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contactsData,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contactData = await getContactById(contactId);
    if (!contactData) {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Successfully found contact with id {contactId}!',
      data: contactData,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
