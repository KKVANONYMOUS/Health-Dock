import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Hospital from '../models/hospitalModel.js'

const checkUserAuth = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id.userId)

      next()
    } catch (err) {
      res.status(401)
      res.json('Not authorised, token failed')
    }
  }

  if (!token) {
    res.status(401)
    res.json('Not authorised, token failed')
  }
})

const checkHospitalAuth = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await Hospital.findById(decoded.id.hospitalId)

      next()
    } catch (err) {
      res.status(401)
      res.json('Not authorised, token failed')
    }
  }

  if (!token) {
    res.status(401)
    res.json('Not authorised, token failed')
  }
})

export { checkUserAuth, checkHospitalAuth }
