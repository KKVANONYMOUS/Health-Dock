import mongoose from 'mongoose'

const PatientSchema = mongoose.Schema(
  {
    aadharNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Patient = mongoose.model('Patient', PatientSchema)

export default Patient
