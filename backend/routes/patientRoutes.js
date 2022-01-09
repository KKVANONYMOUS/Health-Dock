import { Router } from 'express'
import {
  addPatient,
  editPatient,
  getPatientDetails,
  getPatientsList,
} from '../controllers/patientControllers.js'
import { checkUserAuth } from '../middleware/authMiddleware.js'
const router = Router()

router
  .route('/')
  .get(checkUserAuth, getPatientsList)
  .post(checkUserAuth, addPatient)
router
  .route('/:id')
  .get(checkUserAuth, getPatientDetails)
  .put(checkUserAuth, editPatient)

export default router
