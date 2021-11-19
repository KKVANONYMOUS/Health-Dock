import mongoose from 'mongoose'

const UserSchema = mongoose.Schema(
  {
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', UserSchema)

export default User
