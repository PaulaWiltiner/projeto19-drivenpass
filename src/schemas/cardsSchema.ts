import Joi from 'joi';

export const cardsSchema = Joi.object({
  title: Joi.string().min(4).required(),
  name:Joi.string().min(3).required(),
  number: Joi.string(),
  cvc: Joi.number(),
  password: Joi.number(),
  expirationDate: Joi.string(),
  isVirtual: Joi.boolean(),
  type: Joi.number()
});