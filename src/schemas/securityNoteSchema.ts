import Joi from 'joi';

export const securityNoteSchema = Joi.object({
  title: Joi.string().min(4).max(50).required(),
  text: Joi.string().min(4).max(1000).required(),
});