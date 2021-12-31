import { Router } from 'express'
import {
  addPatient,
  editPatient,
  getPatientDetails,
  getPatientsList,
} from '../controllers/patientControllers.js'
import { checkAuth } from '../middleware/authMiddleware.js'
const router = Router()

router.route('/').get(checkAuth, getPatientsList).post(checkAuth, addPatient)
router
  .route('/:id')
  .get(checkAuth, getPatientDetails)
  .put(checkAuth, editPatient)

export default router
