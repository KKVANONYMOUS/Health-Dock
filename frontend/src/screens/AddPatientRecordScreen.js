import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'
import Alert from '../components/Alert'
import {
  addhospitalPatientRecord,
  fetchHospitalPatientDetails,
} from '../redux/hospital/hospitalActions'
import axios from 'axios'
import { useRef } from 'react'

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

const FirstColumn = styled.div`
  width: 30%;
  //  height: 500px;
  //background-color: cyan;
  display: flex;
  flex-direction: column;
  padding: 10px;

  @media (max-width: 1000px) {
    width: 100%;
  }
`

const SecondColumn = styled.div`
  width: 70%;
  //background-color: green;
  padding: 10px;

  @media (max-width: 1000px) {
    width: 100%;
  }
`

const FirstContainer = styled.div`
  background-color: #fff;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  margin-bottom: 20px;
`

const AvatarImage = styled.img`
  max-width: 200px;
  max-height: 140px;
  width: 45%;
  border-radius: 15px;
  margin-bottom: 15px;

  @media (max-width: 1000px) {
    width: auto;
    margin: 0 15px;
  }
`

const ProfileName = styled.h2`
  color: #496bf2;
  font-family: 'Montserrat';
  font-weight: 800;
`

const SecondContainer = styled(FirstContainer)`
  text-align: left;
  padding: 20px;
  margin-bottom: 0;
`

const ContainerHeading = styled.h4`
  color: #35484e;
  font-family: 'Poppins';
  font-weight: 800;
  margin-bottom: 10px;
`

const InfoField = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const InfoFieldLabel = styled.h5`
  color: #35484e;
  font-family: 'Quicksand';
  font-weight: 800;
  width: 50%;
`

const InfoFieldData = styled.p`
  color: #7c7f8c;
  font-family: 'Montserrat';
  font-weight: 500;
  width: 50%;
  font-size: 13px;
`

const SecondColumnContainer = styled.div`
  background-color: #fff;
  border-radius: 20px;
  //padding: 40px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
