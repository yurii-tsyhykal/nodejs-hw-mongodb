import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.requierd': 'Username is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Email must be a valid',
    'any.requierd': 'Email is required',
  }),
  password: Joi.string().min(5).max(10).required().messages({
    'string.base': 'Password should be a string',
    'string.min': 'Password should have at least {#limit} characters',
    'string.max': 'Password should have at most {#limit} characters',
    'any.requierd': 'Password is required',
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Email must be a valid',
    'any.requierd': 'Email is required',
  }),
  password: Joi.string().min(5).max(10).required().messages({
    'string.base': 'Password should be a string',
    'string.min': 'Password should have at least {#limit} characters',
    'string.max': 'Password should have at most {#limit} characters',
    'any.requierd': 'Password is required',
  }),
});

export const sendResetEmail = Joi.object({
  email: Joi.string().email().required(),
});
