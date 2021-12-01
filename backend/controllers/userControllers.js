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
    message: `Your OTP to register/login Health Log is ${otp} \n\nTeam Health Log`,
    numbers: [phoneNumber],
  })

  if (!resData.status_code) {
    user.phoneOtp = otp
    await user.save()
    res.status(200).json({
      message: 'OTP sent successfully',
      data: {
        otp: otp,
        userId: user._id,
      },
    })
  } else {
    res.status(resData.status_code).json({ message: resData.message })
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
    res.json({ message: 'User Not Found' })
    return
  }

  if (user.phoneOtp !== otp) {
    res.status(401)
    res.json({ message: 'Invalid OTP' })
    await user.deleteOne()
    return
  }

  const token = generateToken({ userId })

  user.phoneOtp = ''
  await user.save()

  res.status(200).json({
    message: 'OTP verified successully',
    data: {
      token,
      userId,
    },
  })
})

export { authUser, verifyOTP }
