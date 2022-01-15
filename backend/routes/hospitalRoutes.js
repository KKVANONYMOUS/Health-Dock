import { Router } from 'express'
import {
  getHospitalDashboard,
  getPatientDetailsThroughHospital,
  loginHospital,
  registerHospital,
} from '../controllers/hospitalControllers.js'
import { checkHospitalAuth } from '../middleware/authMiddleware.js'

const router = Router()
router.route('/register').post(registerHospital)
router.route('/login').post(loginHospital)
router.route('/dashboard').get(checkHospitalAuth, getHospitalDashboard)
router
  .route('/dashboard/:aadharNumber')
  .get(checkHospitalAuth, getPatientDetailsThroughHospital)

export default router
