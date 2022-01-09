import { Router } from 'express'
import {
  getHospitalDashboard,
  loginHospital,
  registerHospital,
} from '../controllers/hospitalControllers.js'
import { checkHospitalAuth } from '../middleware/authMiddleware.js'

const router = Router()
router.route('/register').post(registerHospital)
router.route('/login').post(loginHospital)
router.route('/dashboard').get(checkHospitalAuth, getHospitalDashboard)

export default router
