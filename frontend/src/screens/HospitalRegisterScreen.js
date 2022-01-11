import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import Alert from '../components/Alert'
import { registerHospital } from '../redux/hospital/hospitalActions'

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
  height: 600px;
  background-color: #fff;
  display: flex;

  @media (max-width: 1000px) {
    width: 100%;
    height: 100vh;
    //padding-left: 20px;
  }
`

const AuthCardImage = styled.img`
  width: 50%;

  @media (max-width: 1000px) {
    display: none;
  }
`

const AuthCardInfo = styled.div`
  //  background-color: yellow;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding-left: 30px;

  @media (max-width: 1000px) {
    align-items: center;
    padding-left: 0;
  }
`

const AuthCardHeading = styled.h1`
  font-family: 'Montserrat';
  font-weight: 700;
  color: #496bf2;
  //background-color: red;
  margin-bottom: 15px;
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
  margin-bottom: 10px;
  //background-color: pink;
`

const AuthFormLabel = styled.h6`
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

const AuthFormInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  height: 30px;
  padding: 2px;
  font-family: 'Quicksand';
  font-size: 12px;

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
  width: 85%;
  text-align: center;
`

const BackButton = styled(Link)`
  text-decoration: none;
  color: #496bf2;
  font-family: 'Poppins';
  margin-top: 15px;
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

const AuthCardRedirect = styled.p`
  font-family: 'Montserrat';
  font-size: 10px;
  font-weight: 500;
  color: #000;
  margin-bottom: 20px;
`

const LoginLink = styled(Link)`
  text-decoration: none;
  color: #2dd6c1;
  font-family: 'Poppins';
  font-size: 10px;
  font-weight: 700;

  &:hover {
    color: #496bf2;
  }
`

const UtilityContainer = styled.div`
  display: flex;
`
const FormInputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-bottom: 10px;

  &.rightMargin {
    margin-right: 10px;
  }
`

const HospitalRegisterScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const hospitalRegister = useSelector((state) => state.hospitalRegister)
  const { loading, error, hospitalInfo } = hospitalRegister

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (
      registrationNumber === '' ||
      name === '' ||
      password === '' ||
      confirmPassword === '' ||
      address === '' ||
      phoneNumber === ''
    ) {
      setErrorMessage('Please give valid input')
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match')
      return
    }

    if (phoneNumber.length !== 10) {
      setErrorMessage('Enter valid phone number')
      return
    }

    setErrorMessage('')
    dispatch(
      registerHospital(registrationNumber, password, name, address, phoneNumber)
    )
  }

  useEffect(() => {
    if (hospitalInfo) {
      navigate('/hospital/dashboard')
    }
  }, [hospitalInfo, navigate])

  return (
    <Container>
      <AuthCard>
        <AuthCardInfo>
          {error && <Alert error width='85%' message={error} />}
          <AuthCardHeading>Health Dock.</AuthCardHeading>
          <AuthCardSubHeading>Hospital Register</AuthCardSubHeading>
          <AuthCardSubHeadingInfo>
            Register yourself and digitalize your database
          </AuthCardSubHeadingInfo>

          <AuthForm onSubmit={handleSubmit}>
            <UtilityContainer>
              <FormInputContainer className='rightMargin'>
                <AuthFormLabel>REGISTRATION NUMBER</AuthFormLabel>
                <AuthFormInputContainer errorMessage={errorMessage}>
                  <AuthFormInput
                    type='text'
                    placeholder='Enter registration number'
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                  />
                </AuthFormInputContainer>
              </FormInputContainer>
              <FormInputContainer>
                <AuthFormLabel>HOSPITAL NAME</AuthFormLabel>
                <AuthFormInputContainer errorMessage={errorMessage}>
                  <AuthFormInput
                    type='text'
                    placeholder='Enter hospital name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </AuthFormInputContainer>
              </FormInputContainer>
            </UtilityContainer>
            <UtilityContainer>
              <FormInputContainer className='rightMargin'>
                <AuthFormLabel>PASSWORD</AuthFormLabel>
                <AuthFormInputContainer errorMessage={errorMessage}>
                  <AuthFormInput
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </AuthFormInputContainer>
              </FormInputContainer>
              <FormInputContainer>
                <AuthFormLabel>CONFIRM PASSWORD</AuthFormLabel>
                <AuthFormInputContainer errorMessage={errorMessage}>
                  <AuthFormInput
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </AuthFormInputContainer>
              </FormInputContainer>
            </UtilityContainer>
            <UtilityContainer>
              <FormInputContainer className='rightMargin'>
                <AuthFormLabel>ADDRESS</AuthFormLabel>
                <AuthFormInputContainer errorMessage={errorMessage}>
                  <AuthFormInput
                    type='text'
                    placeholder='Enter address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </AuthFormInputContainer>
              </FormInputContainer>
              <FormInputContainer>
                <AuthFormLabel>PHONE NUMBER</AuthFormLabel>
                <AuthFormInputContainer errorMessage={errorMessage}>
                  <AuthFormInput
                    type='number'
                    placeholder='Enter phone number'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </AuthFormInputContainer>
              </FormInputContainer>
            </UtilityContainer>

            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <AuthFormSubmitButton disabled={loading}>
              {loading ? <Spinner width={18} height={18} /> : 'Register'}
            </AuthFormSubmitButton>
          </AuthForm>
          <AuthCardRedirect>
            Already have an account?{' '}
            <LoginLink to='/hospital/login'>Login</LoginLink>
          </AuthCardRedirect>
          <AuthCardCopyright>
            ©2022 Health Dock All rights reserved
          </AuthCardCopyright>
          <BackButton to='/'>{'< '}Back</BackButton>
        </AuthCardInfo>
        <AuthCardImage src='../../images/HospitalRegisterImage.png' />
      </AuthCard>
    </Container>
  )
}

export default HospitalRegisterScreen
