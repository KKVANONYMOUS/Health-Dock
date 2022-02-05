import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../components/Spinner/'
import Alert from '../../components/Alert/'
import { registerHospital } from '../../redux/hospital/hospitalActions'
import HospitalRegisterImage from '../../images/HospitalRegisterImage.png'
import {
  AuthCard,
  AuthCardCopyright,
  AuthCardHeading,
  AuthCardImage,
  AuthCardInfo,
  AuthCardRedirect,
  AuthCardSubHeading,
  AuthCardSubHeadingInfo,
  AuthForm,
  AuthFormInput,
  AuthFormInputContainer,
  AuthFormLabel,
  AuthFormSubmitButton,
  BackButton,
  Container,
  ErrorMessage,
  FormInputContainer,
  LoginLink,
  UtilityContainer,
} from './style'

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
        <AuthCardImage
          src={HospitalRegisterImage}
          alt='Hospital Register Image'
        />
      </AuthCard>
    </Container>
  )
}

export default HospitalRegisterScreen
