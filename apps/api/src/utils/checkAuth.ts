import { JwtPayload, verify } from 'jsonwebtoken'

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(
    /Bearer\s?/,
    '',
  )

  if (token) {
    try {
      const decoded: string | JwtPayload | any = verify(
        token,
        'secret',
      )

      req.userId = decoded._id

      next()
    } catch (err) {
      return res.status(403).json({
        message: 'No Access',
      })
    }
  } else {
    return res.status(403).json({
      message: 'No Access',
    })
  }

  res.send(token)
}
