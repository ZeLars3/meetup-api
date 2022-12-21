import * as Joi from "joi";

export const meetupCreateValidatorSchema = Joi.object().keys({
  title: Joi.string().min(3).required().error(new Error('Title must be at least 3 characters !')),
  description: Joi.string().min(10).required().error(new Error('Please enter a description of meetup!')),
  tags: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
  date: Joi.date().error(new Error('Enter a valid date for the meetup !')),
  place: Joi.string().error(new Error('Please enter a place for the meetup !')),
})
