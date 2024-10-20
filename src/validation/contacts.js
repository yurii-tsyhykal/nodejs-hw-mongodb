import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.base': 'Phone number should be a string',
      'string.pattern.base':
        'Phone number must start with +380 and contain exactly 9 digits after it',
      'string.min': 'Phone number should have at least {#limit} digits',
      'string.max': 'Phone number should have at most {#limit} digits',
      'any.required': 'Phone number is required.',
    }),
  email: Joi.string().email(),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid('work', 'home', 'personal')
    .default('personal')
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .min(3)
    .max(20)
    .messages({
      'string.base': 'Phone number should be a string',
      'string.pattern.base':
        'Phone number must start with +380 and contain exactly 9 digits after it',
      'string.min': 'Phone number should have at least {#limit} digits',
      'string.max': 'Phone number should have at most {#limit} digits',
      'any.required': 'Phone number is required.',
    }),
  email: Joi.string().min(3).max(20).email(),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid('work', 'home', 'personal')
    .default('personal')
});
