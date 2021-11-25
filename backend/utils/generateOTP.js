const generateOTP = (otp_length) => {
  const digits = '0123456789'
  let OTP = ''
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)]
  }
  return OTP
}

export default generateOTP
