import Joi from 'joi';

export const wifiSchema = Joi.object({
  name:Joi.string().min(3).required(),
  password: Joi.string().min(4).required()
});