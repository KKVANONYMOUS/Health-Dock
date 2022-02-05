import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/'
import Alert from '../../components/Alert/'
import Spinner from '../../components/Spinner/'
import { fetchPatientDetails } from '../../redux/patient/patientActions'
import {
  AvatarImage,
  BackButton,
  Container,
  ContainerHeading,
  FirstColumn,
  FirstContainer,
  Heading,
  InfoField,
  InfoFieldData,
  InfoFieldLabel,
  Message,
  ProfileName,
  RecordTableContainer,
  ReportLink,
  SecondColumn,
  SecondColumnContainer,
  SecondContainer,
  Table,
  TableBody,
  TableContainer,
  TableData,
  TableHeadBox,
  TableHeading,
  TableRow,
  Wrapper,
} from './style'

const PatientDetailsScreen = () => {
  const { id: patientId } = useParams()

  const [avatarImageUrl, setAvatarImageUrl] = useState('')

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

  useEffect(() => {
    if (!userInfo) {
      navigate('/user/auth')
    } else {
      if (!patient._id || patient._id !== patientId) {
        dispatch(fetchPatientDetails(patientId))
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
  }, [dispatch, navigate, userInfo, patient, patientId])

  const toDate = (dob) => {
    const formatDOB = new Date(dob)
    return formatDOB
  }

  const headingColumns = [
    'S.NO',
    'DESCRIPTION',
    'ATTENDED BY',
    'PLACE',
    'DATE',
    'REPORT',
  ]
  return (
    <>
      <Navbar />
      <Container>
        <BackButton to='/user/dashboard'>{'< '}Back</BackButton>
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
                  <Heading>Patient Records</Heading>
                  {patient.records && patient.records.length === 0 ? (
                    <Message>No records found!</Message>
                  ) : (
                    <RecordTableContainer>
                      <TableContainer>
                        <Table>
                          <TableHeadBox>
                            <TableRow>
                              {headingColumns.map((col, index) => (
                                <TableHeading key={index}>{col}</TableHeading>
                              ))}
                            </TableRow>
                          </TableHeadBox>
                          <TableBody>
                            {patient.records &&
                              patient.records.map((record, index) => (
                                <TableRow key={index}>
                                  <TableData data-heading='S.NO'>
                                    {index + 1}
                                  </TableData>
                                  <TableData data-heading='DESCRIPTION'>
                                    {record.description}
                                  </TableData>
                                  <TableData data-heading='ATTENDED BY'>
                                    {record.attendedBy}
                                  </TableData>
                                  <TableData data-heading='PLACE'>
                                    {record.hospitalName}
                                  </TableData>
                                  <TableData data-heading='DATE'>
                                    {toDate(record.date).toLocaleDateString(
                                      'en-UK'
                                    )}
                                  </TableData>
                                  <TableData data-heading='REPORT'>
                                    <ReportLink
                                      href={record.report}
                                      target='_blank'
                                      referrerPolicy='no-referrer'
                                      rel='noopener'
                                    >
                                      View Report
                                    </ReportLink>
                                  </TableData>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </RecordTableContainer>
                  )}
                </SecondColumnContainer>
              </SecondColumn>
            </>
          )}
        </Wrapper>
      </Container>
    </>
  )
}

export default PatientDetailsScreen
