import { contactsModel } from '../models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortOrder,
  sortBy,
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = contactsModel.find();

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    contactsModel.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = (contactId) => contactsModel.findById(contactId);

export const createNewContact = (contactData) =>
  contactsModel.create(contactData);

export const updateContact = (contactId, contact) =>
  contactsModel.findOneAndUpdate({ _id: contactId }, contact, { new: true });

export const deleteContact = (contactId) =>
  contactsModel.findOneAndDelete({ _id: contactId });
