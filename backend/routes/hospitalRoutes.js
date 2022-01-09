import { Router } from 'express'
import {
  loginHospital,
  registerHospital,
} from '../controllers/hospitalControllers.js'

const route = Router()
route.post('/register', registerHospital)
route.post('/login', loginHospital)

export default route
