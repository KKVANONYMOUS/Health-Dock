import styled from 'styled-components'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'
import Alert from '../components/Alert'
import {
  fetchHospitalPatientRecord,
  resetUpdateHospitalPatientRecord,
  updateHospitalPatientRecord,
} from '../redux/hospital/hospitalActions'

const Container = styled.div`
  position: relative;
  top: 70px;
  left: 0;
  width: 100%;
  padding: 20px 75px 20px;
  background-color: #f8f8fa;
  //  background-color: cyan;
  height: calc(100vh - 70px);

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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`

const Heading = styled.h1`
  color: #496bf2;
  font-family: 'Poppins';
  font-weight: 800;
  margin-bottom: 20px;
`

const Form = styled.form`
  width: 50%;
  //margin-bottom: 30px;
  //padding: 0 80px;
  //background-color: pink;

  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 2rem;
    margin-bottom: 30px;
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
`

const FormInput = styled.input`
  border: none;
  border-bottom: 3px solid #2dd6c1;
  outline: none;
  width: 100%;
  height: 30px;
  padding: 5px;
  font-family: 'Quicksand';
  font-weight: 600;
  font-size: 14px;
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

const ErrorMessage = styled.h6`
  color: red;
  font-style: italic;
`

const EditPatientRecordScreen = () => {
  const { aadharNumber: patientAadharNumber, recordId: patientRecordId } =
    useParams()

  const [description, setDescription] = useState('')
  const [attendedBy, setAttendedBy] = useState('')
  const [date, setDate] = useState('')
  const [report, setReport] = useState('')
  const [uploading, setUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const hospitalLogin = useSelector((state) => state.hospitalLogin)
  const { hospitalInfo } = hospitalLogin

  const hospitalViewPatientRecord = useSelector(
    (state) => state.hospitalViewPatientRecord
  )
  const {
    loading: loadingDetails,
    error: errorDetails,
    record,
  } = hospitalViewPatientRecord

  const hospitalUpdatePatientRecord = useSelector(
    (state) => state.hospitalUpdatePatientRecord
  )
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = hospitalUpdatePatientRecord

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('report', file)
    setErrorMessage('')
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload/report', formData, config)

      setReport(data)
      setUploading(false)
    } catch (error) {
      setErrorMessage('Some Error Occurred')
      setUploading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (
      description === '' ||
      attendedBy === '' ||
      date === '' ||
      report === ''
    ) {
      setErrorMessage('Please give valid input')
      return
    }

    setErrorMessage('')
    dispatch(
      updateHospitalPatientRecord(
        patientAadharNumber,
        patientRecordId,
        date,
        description,
        hospitalInfo.name,
        attendedBy,
        report
      )
    )
  }

  useEffect(() => {
    if (!hospitalInfo) {
      navigate('/hospital/login')
    } else {
      if (successUpdate) {
        dispatch(resetUpdateHospitalPatientRecord())
        navigate(-1)
      } else {
        if (!record.description || record._id !== patientRecordId) {
          dispatch(
            fetchHospitalPatientRecord(patientAadharNumber, patientRecordId)
          )
        } else {
          setDescription(record.description)
          setAttendedBy(record.attendedBy)
          setDate(record.date.substring(0, 10))
          setReport(record.report)
        }
      }
    }
  }, [
    dispatch,
    navigate,
    hospitalInfo,
    record,
    successUpdate,
    patientAadharNumber,
    patientRecordId,
  ])

  return (
    <>
      <Navbar />
      <Container>
        <BackButton to={`/hospital/dashboard/${patientAadharNumber}`}>
          {'< '}Back
        </BackButton>
        <Heading>Edit Record</Heading>
        {errorUpdate && <Alert error message={errorUpdate} />}
        <Wrapper>
          {loadingDetails ? (
            <Spinner width={60} height={60} color='#000' />
          ) : errorDetails ? (
            <Alert error message={errorDetails} />
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormInputContainer>
                <FormLabel>DESCRIPTION</FormLabel>
                <FormInput
                  type='text'
                  placeholder='Enter check up/consultation/test details'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormInputContainer>
              <FormInputContainer>
                <FormLabel>ATTENDED BY</FormLabel>
                <FormInput
                  type='text'
                  placeholder='Enter doctor/attendent name'
                  value={attendedBy}
                  onChange={(e) => setAttendedBy(e.target.value)}
                />
              </FormInputContainer>
              <FormInputContainer>
                <FormLabel>DATE</FormLabel>
                <FormInput
                  type='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </FormInputContainer>
              <FormInputContainer>
                <FormLabel>PATIENT REPORT</FormLabel>
                <FormInput
                  type='text'
                  value={report}
                  onChange={(e) => setReport(e.target.value)}
                />
                <InputFile
                  type='file'
                  label='Choose File'
                  onChange={uploadFileHandler}
                />
                {uploading && <Spinner width={18} height={18} color='#000' />}
              </FormInputContainer>
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
              <FormSubmitButton
                disabled={loadingUpdate}
                errorMessage={errorMessage}
                type='submit'
              >
                {loadingUpdate ? (
                  <Spinner width={18} height={18} />
                ) : (
                  'Update Record'
                )}
              </FormSubmitButton>
            </Form>
          )}
        </Wrapper>
      </Container>
    </>
  )
}

export default EditPatientRecordScreen
