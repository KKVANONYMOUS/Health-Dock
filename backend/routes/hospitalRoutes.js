import { Router } from 'express'
import {
  addPatientRecordThroughHospital,
  getHospitalDashboard,
  getPatientDetailsThroughHospital,
  loginHospital,
  registerHospital,
  viewPatientRecordsThroughHospital,
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
router
  .route('/dashboard/:aadharNumber/records')
  .get(checkHospitalAuth, viewPatientRecordsThroughHospital)

export default router
