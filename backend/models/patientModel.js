import mongoose from 'mongoose'

const reportSchema = mongoose.Schema(
  {
    description: { type: String, required: true },
    attendedBy: { type: Number, required: true },
    date: { type: Date, required: true },
    report: {
      type: String,
      required: true,
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Hospital',
    },
  },
  {
    timestamps: true,
  }
)

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
    image: {
      type: String,
      default: '',
    },
    reports: [reportSchema],
  },
  {
    timestamps: true,
  }
)

const Patient = mongoose.model('Patient', PatientSchema)

export default Patient
