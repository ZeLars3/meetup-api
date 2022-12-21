import * as Joi from "joi";

export const loginValidatorSchema = Joi.object().keys({
  email: Joi.string().email().required().error(new Error('Please enter a valid email address !')),
  password: Joi.string().required().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).error(new Error('Please enter a valid password !'))
})

