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

export const updateContact = async (contactId, contact) => {
  const result = await contactsModel.findOneAndUpdate(
    { _id: contactId },
    contact,
    { new: true },
  );

  if (!result) {
    return null;
  }

  return result;
};

export const deleteContact = async (contactId) => {
  const result = await contactsModel.findOneAndDelete({ _id: contactId });
  return result;
};
