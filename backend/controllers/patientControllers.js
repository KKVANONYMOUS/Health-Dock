import asyncHandler from 'express-async-handler'
import Patient from '../models/patientModel.js'
import User from '../models/userModel.js'

// @desc   Add new patient
// @route  POST /api/patient
// @access Private
const addPatient = asyncHandler(async (req, res) => {
  const { aadharNumber, name, gender, age, bloodGroup, dob } = req.body

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
  const { name, gender, age, bloodGroup, dob } = req.body

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

const getPatient = asyncHandler(async (req, res) => {
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
      aadharNumber: patient.aadharNumber,
      name: patient.name,
      gender: patient.gender,
      age: patient.age,
      bloodGroup: patient.bloodGroup,
      dob: patient.dob,
    })
  }
  res.status(200).json({
    patientDetails,
  })
})
export { addPatient, editPatient, getPatient }
