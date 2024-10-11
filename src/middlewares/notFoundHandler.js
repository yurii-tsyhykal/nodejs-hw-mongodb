import createHttpError from 'http-errors';

export const notFoundHandler = (req, res, next) => {
  // res.status(404).json({ status: 404, message: 'Route not found' });
  throw createHttpError(404, 'Route not found');
};
