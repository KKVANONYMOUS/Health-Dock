import { Router } from 'express'
import {
  addPatientRecordThroughHospital,
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
  .post(checkHospitalAuth, addPatientRecordThroughHospital)

export default router
