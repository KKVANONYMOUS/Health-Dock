import { Router } from 'express'
import { addPatient } from '../controllers/patientControllers.js'
import { checkAuth } from '../middleware/authMiddleware.js'
const router = Router()

router.route('/').post(checkAuth, addPatient)

export default router
