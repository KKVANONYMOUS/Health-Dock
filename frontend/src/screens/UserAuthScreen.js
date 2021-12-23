import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendOtp, verifyOtp } from '../redux/user/userActions'
import Spinner from '../components/Spinner'
//import toast, { Toaster } from 'react-hot-toast'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e5e5e5;
`

const AuthCard = styled.div`
  width: 1000px;
  height: 500px;
  background-color: #fff;
  display: flex;

  @media (max-width: 1000px) {
    width: 100%;
    height: 100vh;
    //padding-left: 20px;
  }
`

const AuthCardImage = styled.img`
  width: 60%;

  @media (max-width: 1000px) {
    display: none;
  }
`

const AuthCardInfo = styled.div`
  //background-color: yellow;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  //padding-right: 20px;

  @media (max-width: 1000px) {
    align-items: center;
  }
`

const AuthCardHeading = styled.h1`
  font-family: 'Montserrat';
  font-weight: 700;
  color: #496bf2;
  //background-color: red;
  margin-bottom: 30px;
`

const AuthCardSubHeading = styled.h2`
  font-family: 'Poppins';
  font-weight: 500;
`

const AuthCardSubHeadingInfo = styled.p`
  font-family: 'Montserrat';
  font-size: 12px;
  color: #737688;
  width: 85%;
  margin-bottom: 30px;
  //background-color: cyan;

  @media (max-width: 1000px) {
    text-align: center;
    font-size: 11px;
  }
`

const AuthForm = styled.form`
  width: 85%;
  margin-bottom: 30px;
  //background-color: pink;
`

const AuthFormLabel = styled.h5`
  font-family: 'Poppins';
  font-weight: 600;
  color: #2dd6c1;
`
const AuthFormInputContainer = styled.div`
  display: flex;
  border-bottom: 3px solid #496bf2;
  width: 100%;
  justify-content: start;
  align-items: center;
  margin-bottom: ${({ errorMessage }) => (errorMessage ? '5px' : '20px')};
`

const AuthFormInputPrefix = styled.h4`
  font-family: 'Montserrat';
  font-weight: 500;
`

const VerticalLine = styled.div`
  border-left: 2px solid #000;
  height: 20px;
  margin: 0 2px;
`

const AuthFormInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  height: 30px;
  padding: 2px;
  font-family: 'Quicksand';
  font-size: 15px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

   {
    -moz-appearance: textfield;
  }
`

const AuthFormSubmitButton = styled.button`
  background-color: #2dd6c1;
  color: #fff;
  font-family: 'Quicksand';
  font-weight: 500;
  width: 100%;
  padding: 10px 20px;
  border: none;
  outline: none;
  cursor: ${({ disabled }) => (disabled ? 'no-drop' : 'pointer')};
`

const AuthCardCopyright = styled.div`
  color: #54586a;
  font-family: 'Quicksand';
  font-size: 10px;
  width: 100%;
  text-align: center;
`

const BackButton = styled(Link)`
  text-decoration: none;
  color: #496bf2;
  font-family: 'Poppins';
  margin-top: 50px;
  font-size: 12px;
  font-weight: 700;

  &:hover {
    color: #2dd6c1;
  }
`

const ErrorMessage = styled.h6`
  color: red;
  font-style: italic;
  margin-bottom: 5px;
`
const UserAuthScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [mobileNum, setMobileNum] = useState('')
  const [otp, setOtp] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorOTPMessage, setOTPErrorMessage] = useState('')
  //const [isverifyOTP, setIsverifyOTP] = useState(false)

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
    //setIsverifyOTP(false)

    if (num.length < 10 || num.length > 10) {
      setErrorMessage('Please enter valid Mobile Number!')
      return
    }

    dispatch(sendOtp(num))
    //if (!userSendOtpLoading && !userSendOtpError) setIsverifyOTP(true)
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
    }
  }, [userInfo, navigate])
  return (
    <Container>
      {/*<div>
        <Toaster />
      </div>*/}
      <AuthCard>
        <AuthCardImage src='../../images/CardImage.png' />
        <AuthCardInfo>
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
              {/*{userVerifyOtpError && toast.error(userVerifyOtpError)}*/}
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
              {/*{userSendOtpError && setErrorMessage(userSendOtpError)}*/}
              <AuthFormSubmitButton disabled={userSendOtpLoading}>
                {userSendOtpLoading ? (
                  <Spinner width={18} height={18} />
                ) : (
                  'Get OTP'
                )}
              </AuthFormSubmitButton>
            </AuthForm>
          )}
          <AuthCardCopyright>
            ©2021 Health Dock All rights reserved
          </AuthCardCopyright>
          <BackButton to='/'>{'< '}Back</BackButton>
        </AuthCardInfo>
      </AuthCard>
    </Container>
  )
}

export default UserAuthScreen
