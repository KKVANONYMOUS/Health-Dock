import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../components/Spinner/'
import Alert from '../../components/Alert/'
import { loginHospital } from '../../redux/hospital/hospitalActions'
import HospitalLoginImage from '../../images/HospitalLoginImage.png'
import {
  Container,
  AuthCard,
  AuthCardInfo,
  AuthCardHeading,
  AuthCardSubHeading,
  AuthCardSubHeadingInfo,
  AuthForm,
  AuthFormLabel,
  AuthFormInputContainer,
  AuthFormInput,
  ErrorMessage,
  AuthFormSubmitButton,
  AuthCardRedirect,
  RegisterLink,
  AuthCardCopyright,
  BackButton,
  AuthCardImage,
} from './style'

const HospitalLoginScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const hospitalLogin = useSelector((state) => state.hospitalLogin)
  const { loading, hospitalInfo, error } = hospitalLogin

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (registrationNumber === '' || password === '') {
      setErrorMessage('Please give valid input')
      return
    }

    setErrorMessage('')
    dispatch(loginHospital(registrationNumber, password))
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
          <AuthCardSubHeading>Hospital Login</AuthCardSubHeading>
          <AuthCardSubHeadingInfo>
            Login to access your hospital dashboard
          </AuthCardSubHeadingInfo>

          <AuthForm onSubmit={handleSubmit}>
            <AuthFormLabel>REGISTRATION NUMBER</AuthFormLabel>
            <AuthFormInputContainer errorMessage={errorMessage}>
              <AuthFormInput
                type='text'
                placeholder='Enter registration number'
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
            </AuthFormInputContainer>
            <AuthFormLabel>PASSWORD</AuthFormLabel>
            <AuthFormInputContainer errorMessage={errorMessage}>
              <AuthFormInput
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </AuthFormInputContainer>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <AuthFormSubmitButton disabled={loading}>
              {loading ? <Spinner width={18} height={18} /> : 'Login'}
            </AuthFormSubmitButton>
          </AuthForm>
          <AuthCardRedirect>
            Not registered yet?{' '}
            <RegisterLink to='/hospital/register'>Register</RegisterLink>
          </AuthCardRedirect>
          <AuthCardCopyright>
            ©2022 Health Dock All rights reserved
          </AuthCardCopyright>
          <BackButton to='/'>{'< '}Back</BackButton>
        </AuthCardInfo>
        <AuthCardImage src={HospitalLoginImage} alt='Hospital Login Image' />
      </AuthCard>
    </Container>
  )
}

export default HospitalLoginScreen
