import { compare, genSalt, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { STATUSES, INFO_MESSAGES } from '../constants'
import UserModel from '../models/User'

export const register = async (req, res) => {
  try {
    const { fullName, email, password } =
      req.body
    const salt: string = await genSalt(10)
    const passwordHash: string = await hash(password, salt)

    const doc: any = new UserModel({
      email,
      fullName,
      passwordHash,
    })

    const user = await doc.save()

    const token = sign(
      {
        _id: user._id,
      },
      'secret',
      {
        expiresIn: '30d',
      },
    )

    res.status(STATUSES.created).json({
      ...user._doc,
      token,
    })
  } catch (err) {
    res.status(STATUSES.serverError).json({
      message: INFO_MESSAGES.FailedRegister,
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user: any = await UserModel.findOne({ email })

    if (!user) {
      return res.status(STATUSES.notFound).json({
        message: INFO_MESSAGES.UserNotFound,
      })
    }

    const isValidPass: boolean = await compare(
      password,
      user._doc.passwordHash,
    )

    if (!isValidPass) {
      return res.status(STATUSES.notFound).json({
        message: INFO_MESSAGES.InvalidUserCred,
      })
    }

    const token: string = sign(
      {
        _id: user._id,
      },
      'secret',
      {
        expiresIn: '30d',
      },
    )

    res.status(STATUSES.success).json({
      ...user._doc,
      token,
    })
  } catch (err) {
    res.status(STATUSES.serverError).json({
      message: INFO_MESSAGES.WrongRequest,
    })
  }
}
