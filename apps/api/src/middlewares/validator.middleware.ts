import { STATUSES } from '../constants'

export const meetupValidationMiddleware = (schema) => (req, res, next) => {
  const { title, description, time, place } = req.body
  const { error } = schema.validate({ title, description, time, place })
  const valid = error === undefined

  if (valid) {
    next()
  } else {
    res.status(STATUSES.unprocessableEntity).json(error.details[0].message)
  }
}

export const userValidationMiddleware = (schema) => (req, res, next) => {
  const { email, password, fullName } = req.body
  const { error } = schema.validate({ email, password, fullName })
  const valid = error === undefined

  if (valid) {
    next()
  } else {
    res.status(STATUSES.unprocessableEntity).json(error.details[0].message)
  }
}

