import { contactsModel } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortOrder,
  sortBy,
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = contactsModel.find({ userId });

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

export const getContactById = (contactId, userId) =>
  contactsModel.findOne({ userId, _id: contactId });

export const createNewContact = (contactData, userId) =>
  contactsModel.create({ userId, ...contactData });

export const updateContact = (contactId, contact, userId) =>
  contactsModel.findOneAndUpdate({ _id: contactId, userId }, contact, {
    new: true,
  });

export const deleteContact = (contactId, userId) =>
  contactsModel.findOneAndDelete({ _id: contactId, userId });
