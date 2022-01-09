import asyncHandler from 'express-async-handler'
import Hospital from '../models/hospitalModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Register a new hospital
// @route   POST /api/hospital/register
// @access  Public
const registerHospital = asyncHandler(async (req, res) => {
  const { registrationNumber, name, password, phoneNumber, address } = req.body

  const hospitalExists = await Hospital.findOne({ registrationNumber })

  if (hospitalExists) {
    res.status(400)
    throw new Error('Hospital already exists')
  }

  const hospital = await Hospital.create({
    registrationNumber,
    name,
    password,
    phoneNumber,
    address,
  })

  const token = generateToken({ hospitalId: hospital._id })

  if (hospital) {
    res.status(201).json({
      _id: hospital._id,
      name: hospital.name,
      registrationNumber: hospital.registrationNumber,
      address: hospital.address,
      phoneNumber: hospital.phoneNumber,
      token,
    })
  } else {
    res.status(400)
    throw new Error('Invalid hospital data')
  }
})

// @desc    Login hospital
// @route   POST /api/hospital/login
// @access  Public
const loginHospital = asyncHandler(async (req, res) => {
  const { registrationNumber, password } = req.body

  const hospital = await Hospital.findOne({ registrationNumber })

  if (hospital && (await hospital.matchPassword(password))) {
    const token = generateToken({ hospitalId: hospital._id })
    res.json({
      _id: hospital._id,
      name: hospital.name,
      registrationNumber: hospital.registrationNumber,
      address: hospital.address,
      phoneNumber: hospital.phoneNumber,
      token,
    })
  } else {
    res.status(401)
    throw new Error('Invalid registration number or password')
  }
})

// @desc    Get hospital dashboard
// @route   GET /api/hospital/dashboard
// @access  Private
const getHospitalDashboard = asyncHandler(async (req, res) => {
  const hospital = await Hospital.findById(req.user._id)

  if (hospital) {
    res.json(hospital)
  } else {
    res.status(404)
    throw new Error('Hospital not found')
  }
})

export { registerHospital, loginHospital, getHospitalDashboard }
