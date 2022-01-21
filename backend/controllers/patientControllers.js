import asyncHandler from 'express-async-handler'
import Patient from '../models/patientModel.js'
import User from '../models/userModel.js'

// @desc   Add new patient
// @route  POST /api/patient
// @access Private
const addPatient = asyncHandler(async (req, res) => {
  const {
    phoneNumber: registeredNumber,
    aadharNumber,
    name,
    gender,
    age,
    bloodGroup,
    dob,
  } = req.body

  const aadharNumberExist = await Patient.findOne({ aadharNumber })

  if (aadharNumberExist) {
    res.status(400)
    res.json({ message: 'Aadhar Number already exists' })
    return
  }

  const patient = new Patient({
    aadharNumber,
    name,
    gender,
    age,
    bloodGroup,
    dob,
    registeredNumber,
  })

  await patient.save()

  const user = await User.findById(req.user._id)
  user.patients.push(patient._id)
  await user.save()

  res.status(201)
  res.json(patient)
})

// @desc   Edit patient
// @route  POST /api/patient/:id
// @access Private
const editPatient = asyncHandler(async (req, res) => {
  const { name, gender, age, bloodGroup, dob, image } = req.body

  const patient = await Patient.findById(req.params.id)

  if (patient) {
    const user = await User.findById(req.user._id)
    const checkPatient = user.patients.filter((val) => val == req.params.id)

    if (checkPatient.length != 0) {
      patient.name = name
      patient.gender = gender
      patient.age = age
      patient.bloodGroup = bloodGroup
      patient.dob = dob
      patient.image = image

      const updatedPatient = await patient.save()
      res.json(updatedPatient)
    } else {
      res.status(401)
      res.json('Not authorised, token failed')
    }
  } else {
    res.status(404)
    res.json('Patient not found')
  }
})

// @desc   Fetch patients list
// @route  GET /api/patient/
// @access Private
const getPatientsList = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (!user) {
    res.status(404)
    res.json('no user')
  }
  const patientsList = user.patients

  var patientDetails = []
  for (let i = 0; i < patientsList.length; i++) {
    const patient = await Patient.findById(patientsList[i])
    patientDetails.push({
      id: patient._id,
      aadharNumber: patient.aadharNumber,
      name: patient.name,
      gender: patient.gender,
      age: patient.age,
      bloodGroup: patient.bloodGroup,
      dob: patient.dob,
      image: patient.image,
    })
  }
  res.status(200).json({
    patientDetails,
  })
})

// @desc   Fetch patient details
// @route  GET /api/patient/:id
// @access Private
const getPatientDetails = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id)

  if (patient) {
    res.json(patient)
  } else {
    res.status(404)
    throw new Error('Patient not found')
  }
})
export { addPatient, editPatient, getPatientsList, getPatientDetails }
