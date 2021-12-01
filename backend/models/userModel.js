import mongoose from 'mongoose'

const UserSchema = mongoose.Schema(
  {
    phoneNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Patient',
      },
    ],
    phoneOtp: String,
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', UserSchema)

export default User
