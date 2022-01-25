import fast2sms from 'fast-two-sms'

const sendSMS = (content, phoneNumber) => {
  fast2sms.sendMessage({
    authorization: process.env.FASTSMS_API_KEY,
    message: content,
    numbers: [phoneNumber],
  })
}

export default sendSMS
