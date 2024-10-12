import { contactsModel } from '../models/contact.js';

export const getAllContacts = () => contactsModel.find();

export const getContactById = (contactId) => contactsModel.findById(contactId);

export const createNewContact = (contactData) =>
  contactsModel.create(contactData);

export const updateContact = (contactId, contact) =>
  contactsModel.findOneAndUpdate({ _id: contactId }, contact, { new: true });

export const deleteContact = (contactId) =>
  contactsModel.findOneAndDelete({ _id: contactId });
