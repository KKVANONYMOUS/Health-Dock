import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import Alert from '../components/Alert'
import Spinner from '../components/Spinner'
import {
  fetchPatientDetails,
  resetfetchPatientDetails,
  resetUpdatePatient,
  updatePatient,
} from '../redux/patient/patientActions'
import axios from 'axios'

const Container = styled.div`
  position: relative;
  top: 70px;
  left: 0;
  //height: 100%;
  width: 100%;
  padding: 20px 75px 20px;
  background-color: #fff;
  //background-color: cyan;

  @media (max-width: 767px) {
    padding-left: 15px;
    padding-right: 15px;
  }

  @media (width: 768px) and (height: 1024px) {
    //background-color: red;
    height: 55vh;
    padding-left: 15px;
    padding-right: 15px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    justify-content: center;
    padding-left: 15px;
    padding-right: 15px;
  }
`

const Heading = styled.h1`
  font-family: 'Poppins';
  font-weight: 700;
  color: #54586a;
  margin-bottom: 10px;
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
const Form = styled.form`
  width: 50%;
  margin-bottom: 30px;
  //background-color: pink;

  @media (max-width: 1000px) {
    width: 100%;
  }
`

const FormLabel = styled.h5`
  font-family: 'Poppins';
  font-weight: 600;
  color: #2dd6c1;
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

const FormInput = styled.input`
  border: 1px solid #ccc;
  outline: none;
  width: 100%;
  height: 30px;
  padding: 5px;
  font-family: 'Quicksand';
  font-weight: 600;
  font-size: 14px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

   {
    -moz-appearance: textfield;
  }
`

const FormSelectInput = styled.select`
  border: 1px solid #ccc;
  outline: none;
  width: 100%;
  height: 30px;
  padding: 5px;
  font-family: 'Quicksand';
  font-weight: 600;
  font-size: 14px;
`

const FormSubmitButton = styled.button`
  cursor: ${({ disabled }) => (disabled ? 'no-drop' : 'pointer')};
  background-color: #2dd6c1;
  color: #fff;
  font-family: 'Quicksand';
  font-weight: 500;
  width: 100%;
  padding: 10px 20px;
  border: none;
  outline: none;
  margin-top: ${({ errorMessage }) => (errorMessage ? '5px' : '20px')};
`

const UtilityContainer = styled.div`
  display: flex;
`

const ErrorMessage = styled.h6`
  color: red;
  font-style: italic;
`

const InputFile = styled.input`
  font-family: 'Poppins';
  margin-top: 5px;

  ::-webkit-file-upload-button {
    font-family: 'Poppins';
    background-color: #fff;
    cursor: pointer;
    border: 2px solid #54586a;
    color: #54586a;
    padding: 5px 10px;
    transition: all 0.15s linear;
    &:hover {
      background-color: #54586a;
      color: #fff;
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const EditPatientScreen = ({ match }) => {
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

      const { data } = await axios.post('/api/upload', formData, config)

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
