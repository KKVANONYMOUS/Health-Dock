import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../components/Navbar/'
import Alert from '../../components/Alert/'
import Spinner from '../../components/Spinner/'
import {
  fetchPatientDetails,
  resetfetchPatientDetails,
  resetUpdatePatient,
  updatePatient,
} from '../../redux/patient/patientActions'
import {
  BackButton,
  Container,
  ErrorMessage,
  Form,
  FormInput,
  FormInputContainer,
  FormLabel,
  FormSelectInput,
  FormSubmitButton,
  Heading,
  InputFile,
  UtilityContainer,
  Wrapper,
} from './style'

const EditPatientScreen = () => {
  const { id: patientId } = useParams()
  const [name, setName] = useState('')
  const [aadharNumber, setAadharNumber] = useState('')
  const [gender, setGender] = useState('Male')
  const [dob, setDob] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [age, setAge] = useState('')
  const [image, setImage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [uploading, setUploading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const patientDetails = useSelector((state) => state.patientDetails)
  const {
    loading: loadingDetails,
    error: errorDetails,
    patient,
  } = patientDetails

  const patientUpdate = useSelector((state) => state.patientUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = patientUpdate

  const handleSubmit = (e) => {
    e.preventDefault()

    setErrorMessage('')
    if (
      name === '' ||
      dob === '' ||
      age === '' ||
      bloodGroup === '' ||
      gender === ''
    ) {
      setErrorMessage('Fill all fields')
      return
    }

    setErrorMessage('')

    dispatch(
      updatePatient(
        name,
        aadharNumber,
        dob,
        age,
        bloodGroup,
        gender,
        patientId,
        image
      )
    )
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload/image', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      setUploading(false)
    }
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/user/auth')
    } else {
      if (successUpdate) {
        dispatch(resetUpdatePatient())
        dispatch(resetfetchPatientDetails())
        navigate('/user/dashboard')
      } else {
        if (!patient.name || patient._id !== patientId) {
          dispatch(fetchPatientDetails(patientId))
        } else {
          setName(patient.name)
          setAadharNumber(patient.aadharNumber)
          setAge(patient.age)
          setBloodGroup(patient.bloodGroup)
          setGender(patient.gender)
          setDob(patient.dob.substring(0, 10))
          setImage(patient.image)
        }
      }
    }
  }, [dispatch, navigate, userInfo, patient, successUpdate, patientId])
  return (
    <>
      <Navbar />
      <Container>
        <BackButton to='/user/dashboard'>{'< '}Back</BackButton>
        <Heading>Edit Patient</Heading>
        {errorUpdate && <Alert error message={errorUpdate} />}
        <Wrapper>
          {loadingDetails ? (
            <Spinner width={60} height={60} color='#000' />
          ) : errorDetails ? (
            <Alert error message={errorDetails} />
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormInputContainer>
                <FormLabel>FULL NAME</FormLabel>
                <FormInput
                  type='text'
                  placeholder='Enter full name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormInputContainer>

              <FormInputContainer>
                <FormLabel>AADHAR NUMBER</FormLabel>
                <FormInput
                  type='number'
                  placeholder='Enter aadhar number'
                  value={aadharNumber}
                  onChange={(e) => setAadharNumber(e.target.value)}
                  disabled
                />
              </FormInputContainer>
              <FormInputContainer>
                <FormLabel>PROFILE PICTURE</FormLabel>
                <FormInput
                  type='text'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <InputFile
                  type='file'
                  label='Choose File'
                  onChange={uploadFileHandler}
                />
                {uploading && <Spinner width={18} height={18} color='#000' />}
              </FormInputContainer>
              <UtilityContainer>
                <FormInputContainer className='rightMargin'>
                  <FormLabel>DOB</FormLabel>
                  <FormInput
                    type='date'
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </FormInputContainer>

                <FormInputContainer>
                  <FormLabel>AGE</FormLabel>
                  <FormInput
                    type='number'
                    placeholder='Enter age'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </FormInputContainer>
              </UtilityContainer>
              <UtilityContainer>
                <FormInputContainer className='rightMargin'>
                  <FormLabel>GENDER</FormLabel>
                  <FormSelectInput
                    name='Gender'
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Other'>Other</option>
                  </FormSelectInput>
                </FormInputContainer>

                <FormInputContainer>
                  <FormLabel>BLOOD GROUP</FormLabel>
                  <FormInput
                    type='text'
                    placeholder='Enter blood group'
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                  />
                </FormInputContainer>
              </UtilityContainer>
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
              <FormSubmitButton
                disabled={loadingUpdate}
                errorMessage={errorMessage}
                type='submit'
              >
                {loadingUpdate ? (
                  <Spinner width={18} height={18} />
                ) : (
                  'Update Member'
                )}
              </FormSubmitButton>
            </Form>
          )}
        </Wrapper>
      </Container>
    </>
  )
}

export default EditPatientScreen
