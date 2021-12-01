import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/database.js'
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js'
import userAuthRoutes from './routes/userAuthRoutes.js'
import patientRoutes from './routes/patientRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use('/api/auth', userAuthRoutes)
app.use('/api/patient', patientRoutes)

app.get('/', (req, res) => {
  res.send('App is running...')
})

app.use(notFoundHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode at PORT:${PORT}`)
)
