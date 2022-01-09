import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const hospitalSchema = mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Patient',
      },
    ],
  },
  {
    timestamps: true,
  }
)

hospitalSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

hospitalSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const Hospital = mongoose.model('Hospital', hospitalSchema)

export default Hospital
