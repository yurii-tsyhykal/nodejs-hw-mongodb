import createHttpError from 'http-errors';
import {
  createNewContact,
  getAllContacts,
  getContactById,
} from '../services/contacts.js';

export const getContactsController = async (req, res, next) => {
  const contactsData = await getAllContacts();

  return res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contactsData,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contactData = await getContactById(contactId);
  if (!contactData) {
    throw createHttpError(404, 'Contact not found');
  }

  return res.status(200).json({
    status: 200,
    message: 'Successfully found contact with id {contactId}!',
    data: contactData,
  });
};

export const createContactController = async (req, res, next) => {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email || undefined,
    isFavourite: req.body.isFavourite || undefined,
    contactType: req.body.contactType,
  };
  const newContact = await createNewContact(contact);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};
