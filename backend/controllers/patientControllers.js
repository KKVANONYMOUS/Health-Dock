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

export { addPatient }
