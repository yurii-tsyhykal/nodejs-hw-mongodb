import { contactsModel } from '../models/contact.js';

export const getAllContacts = async () => {
  try {
    const contacts = await contactsModel.find();
    console.log(contacts);
    return contacts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getContactById = async (contactId) => {
  try {
      const contact = await contactsModel.findById(contactId);
    return contact;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
