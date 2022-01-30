import asyncHandler from 'express-async-handler'
import Hospital from '../models/hospitalModel.js'
import Patient from '../models/patientModel.js'
import generateToken from '../utils/generateToken.js'
import sendSMS from '../utils/sendSMS.js'

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

// @desc   Fetch patient details through Hospital Dashboard
// @route  GET /api/hospital/dashboard/:aadharNumber
// @access Private
const getPatientDetailsThroughHospital = asyncHandler(async (req, res) => {
  const patient = await Patient.findOne({
    aadharNumber: req.params.aadharNumber,
  })

  if (patient) {
    res.json(patient)
  } else {
    res.status(404)
    throw new Error('Patient not found')
  }
})

// @desc   Add new patient record
// @route  POST /api/hospital/dashboard/:aadharNumber
// @access Private
const addPatientRecordThroughHospital = asyncHandler(async (req, res) => {
  const { description, attendedBy, date, report, hospitalName } = req.body

  const patient = await Patient.findOne({
    aadharNumber: req.params.aadharNumber,
  })

  if (patient) {
    const recordData = {
      description,
      attendedBy,
      date,
      hospitalName,
      report,
      hospitalId: req.user._id,
    }

    await patient.records.push(recordData)

    await patient.save()

    sendSMS(
      `Your record has been successfully added by ${hospitalName}. If this is not done under your instructions, please visit the concerned hospital \n\nTeam Health Dock`,
      patient.registeredNumber
    )

    res.status(201).json({ message: 'Record added successfully' })
  } else {
    res.status(404)
    res.json('Patient not found')
  }
})

// @desc    Delete patient record
// @route   DELETE /api/hospital/dashboard/:aadharNumber/record/:recordId
// @access  Private
const deletePatientRecordThroughHospital = asyncHandler(async (req, res) => {
  const patient = await Patient.findOne({
    aadharNumber: req.params.aadharNumber,
  })

  if (patient) {
    let updatedRecordsArr = []
    patient.records.forEach((record) => {
      if (record._id.equals(req.params.recordId)) {
        if (record.hospitalId.toString() != req.user._id.toString()) {
          res.status(401)
          throw new Error('Not authorized to view this record')
        }
      } else {
        updatedRecordsArr.push(record)
      }
    })

    if (updatedRecordsArr.length === patient.records.length) {
      res.status(404)
      throw new Error('Record not found')
    }

    patient.records = updatedRecordsArr
    await patient.save()

    sendSMS(
      `Your record has been successfully deleted. If this is not done under your instructions, please visit the concerned hospital \n\nTeam Health Dock`,
      patient.registeredNumber
    )

    res.json({ message: 'Record removed' })
  } else {
    res.status(404)
    throw new Error('Patient not found')
  }
})

// @desc    View patient record
// @route   GET /api/hospital/dashboard/:aadharNumber/record/:recordId
// @access  Private
const viewPatientRecordThroughHospital = asyncHandler(async (req, res) => {
  const patient = await Patient.findOne({
    aadharNumber: req.params.aadharNumber,
  })

  if (patient) {
    let foundRecord
    patient.records.forEach((record) => {
      if (record._id.equals(req.params.recordId)) {
        foundRecord = record
      }
    })

    if (!foundRecord) {
      res.status(404)
      throw new Error('Record not found')
    }

    if (foundRecord.hospitalId.toString() != req.user._id.toString()) {
      res.status(401)
      throw new Error('Not authorized to view this record')
    }

    res.json(foundRecord)
  } else {
    res.status(404)
    throw new Error('Patient not found')
  }
})

// @desc    Edit patient record
// @route   PUT /api/hospital/dashboard/:aadharNumber/record/:recordId
// @access  Private
const editPatientRecordThroughHospital = asyncHandler(async (req, res) => {
  const { date, description, hospitalName, attendedBy, report } = req.body

  const patient = await Patient.findOne({
    aadharNumber: req.params.aadharNumber,
  })

  if (patient) {
    let isRecordExist = false
    patient.records.forEach((record) => {
      if (record._id.equals(req.params.recordId)) {
        if (record.hospitalId.toString() != req.user._id.toString()) {
          res.status(401)
          throw new Error('Not authorized to view this record')
        }

        isRecordExist = true
        record.date = date
        record.description = description
        record.hospitalName = hospitalName
        record.attendedBy = attendedBy
        record.report = report
      }
    })

    if (!isRecordExist) {
      res.status(404)
      throw new Error('Record not found')
    }

    await patient.save()

    sendSMS(
      `Your record has been successfully updated by ${hospitalName}. If this is not done under your instructions, please visit the concerned hospital \n\nTeam Health Dock`,
      patient.registeredNumber
    )

    res.json({ message: 'Record updated successfully' })
  } else {
    res.status(404)
    throw new Error('Patient not found')
  }
})

// @desc    Fetch aadhar number list
// @route   GET /api/hospital/dashboard/aadharNumbers
// @access  Private
const fetchAadharNumberList = asyncHandler(async (req, res) => {
  const patients = await Patient.find({})

  let aadharNumberList = []
  patients.forEach((patient) =>
    aadharNumberList.push(patient.aadharNumber.toString())
  )

  res.json(aadharNumberList)
})

export {
  registerHospital,
  loginHospital,
  getHospitalDashboard,
  getPatientDetailsThroughHospital,
  addPatientRecordThroughHospital,
  deletePatientRecordThroughHospital,
  viewPatientRecordThroughHospital,
  editPatientRecordThroughHospital,
  fetchAadharNumberList,
}
