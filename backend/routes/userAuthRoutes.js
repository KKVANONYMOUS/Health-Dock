import { Router } from 'express'
import { authUser, verifyOTP } from '../controllers/userControllers.js'
const router = Router()

router.post('/user', authUser)
router.post('/user/verify_otp', verifyOTP)

export default router
