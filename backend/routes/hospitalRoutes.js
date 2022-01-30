import { Router } from 'express'
import {
  addPatientRecordThroughHospital,
  deletePatientRecordThroughHospital,
  getHospitalDashboard,
  getPatientDetailsThroughHospital,
  loginHospital,
  registerHospital,
  viewPatientRecordThroughHospital,
  editPatientRecordThroughHospital,
  fetchAadharNumberList,
} from '../controllers/hospitalControllers.js'
import { checkHospitalAuth } from '../middleware/authMiddleware.js'

const router = Router()
router.route('/register').post(registerHospital)
router.route('/login').post(loginHospital)
router.route('/dashboard').get(checkHospitalAuth, getHospitalDashboard)
router
  .route('/dashboard/aadharNumbers')
  .get(checkHospitalAuth, fetchAadharNumberList)
router
  .route('/dashboard/:aadharNumber')
  .get(checkHospitalAuth, getPatientDetailsThroughHospital)
  .post(checkHospitalAuth, addPatientRecordThroughHospital)
router
  .route('/dashboard/:aadharNumber/record/:recordId')
  .get(checkHospitalAuth, viewPatientRecordThroughHospital)
  .put(checkHospitalAuth, editPatientRecordThroughHospital)
  .delete(checkHospitalAuth, deletePatientRecordThroughHospital)

export default router
