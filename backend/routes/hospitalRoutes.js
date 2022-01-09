import { Router } from 'express'
import { registerHospital } from '../controllers/hospitalControllers.js'

const router = Router()
router.post('/register', registerHospital)

export default router
