import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEatly: false });
    next();
  } catch (e) {
    const error = createHttpError(404, 'Bad request', { errors: e.details });
    next(error);
  }
};
