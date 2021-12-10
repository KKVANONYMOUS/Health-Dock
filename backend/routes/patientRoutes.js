import { Router } from 'express'
import { addPatient, editPatient , getPatient} from '../controllers/patientControllers.js'
import { checkAuth } from '../middleware/authMiddleware.js'
const router = Router()

router.route('/').post(checkAuth, addPatient)
router.route('/:id').put(checkAuth, editPatient)
router.route('/').get(checkAuth, getPatient)

export default router
