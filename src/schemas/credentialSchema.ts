import Joi from 'joi';

export const credentialSchema = Joi.object({
  url: Joi.string().uri({
    scheme: ["https"],
  }),
  name:Joi.string().min(3).required(),
  password: Joi.string().min(10).required(),
  title: Joi.string().min(10).required()
});