import createHttpError from 'http-errors';
import {
  createNewContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res, next) => {
  console.log(req.query);

  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const contactsData = await getAllContacts({
    page,
    perPage,
    sortOrder,
    sortBy,
    filter,
  });

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
    message: `Successfully found contact with id ${contactId}!`,
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

export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };
  const result = await updateContact(contactId, contact);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await deleteContact(contactId);
  if (result === null) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
