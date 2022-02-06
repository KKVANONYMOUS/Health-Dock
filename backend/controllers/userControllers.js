import fast2sms from 'fast-two-sms'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateOTP from '../utils/generateOTP.js'
import generateToken from '../utils/generateToken.js'

// @desc   Auth user & generate token
// @route  POST /api/auth/user
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body

  let user = await User.findOne({ phoneNumber })

  if (!user) {
    const createUser = new User({ phoneNumber })
    user = await createUser
  }

  const otp = generateOTP(6)

  const resData = await fast2sms.sendMessage({
    authorization: process.env.FASTSMS_API_KEY,
    message: `Your OTP to register/login Health Log is ${otp} \n\nTeam Health Dock`,
    numbers: [phoneNumber],
  })

  if (!resData.status_code) {
    user.phoneOtp = otp
    await user.save()
    res.status(200).json({
      userId: user._id,
    })
  } else {
    res.status(resData.status_code)
    throw new Error(res.message)
  }
})

// @desc   Verify User OTP
// @route  POST /api/auth/user/verify_otp
// @access Public
const verifyOTP = asyncHandler(async (req, res, next) => {
  const { otp, userId } = req.body

  const user = await User.findById(userId)

  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }

  if (user.phoneOtp !== otp) {
    await user.deleteOne()
    res.status(401)
    throw new Error('Invalid OTP')
  }

  const token = generateToken({ userId })

  user.phoneOtp = ''
  await user.save()

  res.status(200).json({
    phoneNumber: user.phoneNumber,
    token,
    userId,
  })
})

export { authUser, verifyOTP }
