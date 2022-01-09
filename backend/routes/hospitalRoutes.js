import { Router } from 'express'
import {
  loginHospital,
  registerHospital,
} from '../controllers/hospitalControllers.js'

const router = Router()
router.route('/register').post(registerHospital)
router.route('/login').post(loginHospital)

export default router
