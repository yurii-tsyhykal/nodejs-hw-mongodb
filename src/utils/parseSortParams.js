import { SORT_ORDER } from '../constants/index.js';

const parseSortOrder = (sortOrder) => {
  const isKnown = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (isKnown) return sortOrder;
  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  if (sortBy === 'name') return sortBy;
  return '_id';
};

export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;
  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
