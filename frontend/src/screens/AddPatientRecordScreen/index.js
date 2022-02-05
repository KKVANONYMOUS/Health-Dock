import { useRef } from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../components/Navbar/'
import Spinner from '../../components/Spinner/'
import Alert from '../../components/Alert/'
import {
  addhospitalPatientRecord,
  fetchHospitalPatientDetails,
} from '../../redux/hospital/hospitalActions'
import {
  Container,
  BackButton,
  Wrapper,
  FirstColumn,
  FirstContainer,
  AvatarImage,
  ProfileName,
  SecondContainer,
  ContainerHeading,
  InfoField,
  InfoFieldLabel,
  InfoFieldData,
  SecondColumn,
  SecondColumnContainer,
  Heading,
  Form,
  FormInputContainer,
  FormLabel,
  FormInput,
  InputFile,
  ErrorMessage,
  FormSubmitButton,
} from './style'

const AddPatientRecordScreen = () => {
  const { aadharNumber: patientAadharNumber } = useParams()

  const [avatarImageUrl, setAvatarImageUrl] = useState('')
  const [description, setDescription] = useState('')
  const [attendedBy, setAttendedBy] = useState('')
  const [date, setDate] = useState('')
  const [report, setReport] = useState('')
  const [uploading, setUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()
  const ref = useRef()

  const hospitalLogin = useSelector((state) => state.hospitalLogin)
  const { hospitalInfo } = hospitalLogin

  const hospitalPatientDetails = useSelector(
    (state) => state.hospitalPatientDetails
  )
  const {
    loading: loadingDetails,
    error: errorDetails,
    patient,
  } = hospitalPatientDetails

  const hospitalAddPatientRecord = useSelector(
    (state) => state.hospitalAddPatientRecord
  )
  const {
    loading: loadingAddRecord,
    error: errorAddRecord,
    success: successAddRecord,
  } = hospitalAddPatientRecord

  const dispatch = useDispatch()

  useEffect(() => {
    if (!hospitalInfo) {
      navigate('/hospital/login')
    } else {
      if (successAddRecord) {
        setDescription('')
        setAttendedBy('')
        setDate('')
        setReport('')
        ref.current.value = ''
      }
      if (
        !patient.aadharNumber ||
        patient.aadharNumber !== Number(patientAadharNumber)
      ) {
        dispatch(fetchHospitalPatientDetails(patientAadharNumber))
      } else {
        if (patient.image) {
          setAvatarImageUrl(patient.image)
        } else {
          if (patient.aadharNumber) {
            setAvatarImageUrl(
              `https://res.cloudinary.com/healthdockcloud/image/upload/v1643823830/identicon-${
                ((patient.aadharNumber % 10) % 5) + 1
              }.png`
            )
          }
        }
      }
    }
  }, [
    hospitalInfo,
    navigate,
    dispatch,
    patient,
    patientAadharNumber,
    successAddRecord,
  ])

  const toDate = (dob) => {
    const formatDOB = new Date(dob)
    return formatDOB
  }

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
      addhospitalPatientRecord(
        patient.aadharNumber,
        description,
        attendedBy,
        date,
        report,
        hospitalInfo.name
      )
    )
  }

  return (
    <>
      <Navbar />
      <Container>
        <BackButton to='/hospital/dashboard'>{'< '}Back</BackButton>
        <Wrapper>
          {loadingDetails ? (
            <Spinner width={60} height={60} color='#000' />
          ) : errorDetails ? (
            <Alert error message={errorDetails} />
          ) : (
            <>
              <FirstColumn>
                <FirstContainer>
                  <AvatarImage src={avatarImageUrl} alt='Avatar Image' />
                  <ProfileName>{patient.name}</ProfileName>
                </FirstContainer>
                <SecondContainer>
                  <ContainerHeading>Information:</ContainerHeading>
                  <InfoField>
                    <InfoFieldLabel>Age:</InfoFieldLabel>
                    <InfoFieldData>{patient.age}</InfoFieldData>
                  </InfoField>
                  <InfoField>
                    <InfoFieldLabel>Date of Birth:</InfoFieldLabel>
                    <InfoFieldData>
                      {toDate(patient.dob).toLocaleDateString('en-UK')}
                    </InfoFieldData>
                  </InfoField>
                  <InfoField>
                    <InfoFieldLabel>Gender:</InfoFieldLabel>
                    <InfoFieldData>{patient.gender}</InfoFieldData>
                  </InfoField>
                  <InfoField>
                    <InfoFieldLabel>Blood Group:</InfoFieldLabel>
                    <InfoFieldData>{patient.bloodGroup}</InfoFieldData>
                  </InfoField>
                  <InfoField>
                    <InfoFieldLabel>Aadhar Number:</InfoFieldLabel>
                    <InfoFieldData>
                      XXXX-XXXX-X
                      {patient.aadharNumber &&
                        patient.aadharNumber.toString().substring(9)}
                    </InfoFieldData>
                  </InfoField>
                </SecondContainer>
              </FirstColumn>
              <SecondColumn>
                <SecondColumnContainer>
                  <Heading>Add new record</Heading>
                  <Form onSubmit={handleSubmit}>
                    {errorAddRecord && <Alert error message={errorAddRecord} />}
                    {successAddRecord && (
                      <Alert
                        message={`Record added successfully! A SMS notifcation has been sent to the mobile number XXXXX-XX${patient.registeredNumber
                          .toString()
                          .substring(7)}`}
                      />
                    )}
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
                        ref={ref}
                        onChange={uploadFileHandler}
                      />
                      {uploading && (
                        <Spinner width={18} height={18} color='#000' />
                      )}
                    </FormInputContainer>
                    {errorMessage && (
                      <ErrorMessage>{errorMessage}</ErrorMessage>
                    )}
                    <FormSubmitButton
                      disabled={loadingAddRecord}
                      errorMessage={errorMessage}
                      type='submit'
                    >
                      {loadingAddRecord ? (
                        <Spinner width={18} height={18} />
                      ) : (
                        'Add Record'
                      )}
                    </FormSubmitButton>
                  </Form>
                </SecondColumnContainer>
              </SecondColumn>
            </>
          )}
        </Wrapper>
      </Container>
    </>
  )
}

export default AddPatientRecordScreen
