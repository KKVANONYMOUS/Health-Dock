import { Router } from 'express'
import { addPatient, editPatient } from '../controllers/patientControllers.js'
import { checkAuth } from '../middleware/authMiddleware.js'
const router = Router()

router.route('/').post(checkAuth, addPatient)
router.route('/:id').put(checkAuth, editPatient)

export default router
