import { contactsModel } from '../models/contact.js';

export const getAllContacts = async () => {
  const contacts = await contactsModel.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await contactsModel.findById(contactId);
  return contact;
};

export const createNewContact = async (payload) => {
  const contact = await contactsModel.create(payload);
  return contact;
};
