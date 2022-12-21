import * as Joi from "joi";

export const registerValidatorSchema = Joi.object().keys({
    email: Joi.string().email().required().error(new Error('Please enter a valid email address !')),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).error(new Error('Please enter a valid password !')),
    fullName: Joi.string().min(3).trim().required().error(new Error('Name must be at least 3 characters !')),
  }
)

