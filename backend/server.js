import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import path from 'path'
import connectDB from './config/database.js'
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js'
import userAuthRoutes from './routes/userAuthRoutes.js'
import patientRoutes from './routes/patientRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import hospitalRoutes from './routes/hospitalRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use('/api/auth', userAuthRoutes)
app.use('/api/patient', patientRoutes)
app.use('/api/hospital', hospitalRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFoundHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode at PORT:${PORT}`)
)
