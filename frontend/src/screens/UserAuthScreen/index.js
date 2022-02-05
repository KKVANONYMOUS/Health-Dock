import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  sendOtp,
  userSendOtpReset,
  verifyOtp,
} from '../../redux/user/userActions'
import Spinner from '../../components/Spinner/'
import Alert from '../../components/Alert/'
import UserAuthImage from '../../images/UserAuthImage.png'
import {
  AuthCard,
  AuthCardCopyright,
  AuthCardHeading,
  AuthCardImage,
  AuthCardInfo,
  AuthCardSubHeading,
  AuthCardSubHeadingInfo,
  AuthForm,
  AuthFormInput,
  AuthFormInputContainer,
  AuthFormInputPrefix,
  AuthFormLabel,
  AuthFormSubmitButton,
  BackButton,
  Container,
  ErrorMessage,
  VerticalLine,
} from './style'

const UserAuthScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [mobileNum, setMobileNum] = useState('')
  const [otp, setOtp] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorOTPMessage, setOTPErrorMessage] = useState('')

  const userSendOtp = useSelector((state) => state.userSendOtp)
  const {
    loading: userSendOtpLoading,
    data: userSendOtpData,
    error: userSendOtpError,
  } = userSendOtp

  const userVerifyOtp = useSelector((state) => state.userLogin)
  const {
    loading: userVerifyOtpLoading,
    userInfo,
    error: userVerifyOtpError,
  } = userVerifyOtp

  const handleMobileSubmit = (e) => {
    e.preventDefault()

    const num = mobileNum.trim()

    setErrorMessage('')

    if (num.length < 10 || num.length > 10) {
      setErrorMessage('Please enter valid Mobile Number!')
      return
    }

    dispatch(sendOtp(num))
  }

  const handleOTPSubmit = (e) => {
    e.preventDefault()
    setOTPErrorMessage('')
    const otpInput = otp.trim()

    if (otpInput.length < 6) {
      setOTPErrorMessage('Please enter valid otp')
      return
    }
    setOTPErrorMessage('')

    if (!userSendOtpError && userSendOtpData.userId)
      dispatch(verifyOtp(userSendOtpData.userId, otpInput))
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/user/dashboard')
    } else {
      dispatch(userSendOtpReset())
    }
  }, [userInfo, navigate, dispatch])

  return (
    <Container>
      <AuthCard>
        <AuthCardImage src={UserAuthImage} alt='User Auth Image' />
        <AuthCardInfo>
          {userSendOtpError && (
            <Alert error width='85%' message={'Invalid Mobile Number'} />
          )}
          {userVerifyOtpError && (
            <Alert error width='85%' message={userVerifyOtpError} />
          )}
          <AuthCardHeading>Health Dock.</AuthCardHeading>
          <AuthCardSubHeading>Register/Sign In</AuthCardSubHeading>
          <AuthCardSubHeadingInfo>
            Register or Sign In to access your personalized health performa
          </AuthCardSubHeadingInfo>
          {!userSendOtpLoading && !userSendOtpError && userSendOtpData ? (
            <AuthForm onSubmit={handleOTPSubmit}>
              <AuthFormLabel>VERIFY OTP</AuthFormLabel>
              <AuthFormInputContainer errorMessage={errorOTPMessage}>
                <AuthFormInput
                  type='number'
                  placeholder={`Enter OTP sent to xxxxxxx${mobileNum.substring(
                    7
                  )}`}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </AuthFormInputContainer>
              {errorOTPMessage && (
                <ErrorMessage>{errorOTPMessage}</ErrorMessage>
              )}
              <AuthFormSubmitButton disabled={userVerifyOtpLoading}>
                {userVerifyOtpLoading ? (
                  <Spinner width={18} height={18} />
                ) : (
                  'Verify OTP'
                )}
              </AuthFormSubmitButton>
            </AuthForm>
          ) : (
            <AuthForm onSubmit={handleMobileSubmit}>
              <AuthFormLabel>MOBILE NUMBER</AuthFormLabel>
              <AuthFormInputContainer errorMessage={errorMessage}>
                <AuthFormInputPrefix>+91</AuthFormInputPrefix>
                <VerticalLine />
                <AuthFormInput
                  type='number'
                  placeholder='Enter mobile no.'
                  value={mobileNum}
                  onChange={(e) => setMobileNum(e.target.value)}
                />
              </AuthFormInputContainer>
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
              <AuthFormSubmitButton disabled={userSendOtpLoading} type='submit'>
                {userSendOtpLoading ? (
                  <Spinner width={18} height={18} />
                ) : (
                  'Get OTP'
                )}
              </AuthFormSubmitButton>
            </AuthForm>
          )}
          <AuthCardCopyright>
            ©2022 Health Dock All rights reserved
          </AuthCardCopyright>
          <BackButton to='/'>{'< '}Back</BackButton>
        </AuthCardInfo>
      </AuthCard>
    </Container>
  )
}

export default UserAuthScreen
