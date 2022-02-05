import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/'
import Spinner from '../../components/Spinner/'
import Alert from '../../components/Alert/'
import {
  fetchHospitalPatientRecord,
  resetUpdateHospitalPatientRecord,
  updateHospitalPatientRecord,
} from '../../redux/hospital/hospitalActions'
import {
  Container,
  BackButton,
  Heading,
  Wrapper,
  Form,
  FormInputContainer,
  FormLabel,
  FormInput,
  InputFile,
  ErrorMessage,
  FormSubmitButton,
} from './style'

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
