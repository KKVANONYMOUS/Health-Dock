import { Router } from 'express'
import { authUser, verifyOTP } from '../controllers/userControllers.js'
const route = Router()

route.post('/user', authUser)
route.post('/user/verify_otp', verifyOTP)

export default route
