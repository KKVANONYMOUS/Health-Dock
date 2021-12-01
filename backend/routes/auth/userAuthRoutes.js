import { Router } from 'express'
import { authUser, verifyOTP } from '../../controllers/auth/userControllers.js'
const route = Router()

route.post('/user', authUser)
route.post('/user/verify_otp', verifyOTP)

export default route
