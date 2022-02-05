import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { UilTrashAlt, UilEdit } from '@iconscout/react-unicons'
import Navbar from '../../components/Navbar/'
import Spinner from '../../components/Spinner/'
import Alert from '../../components/Alert/'
import {
  deleteHospitalPatientRecord,
  fetchHospitalPatientDetails,
} from '../../redux/hospital/hospitalActions'
import {
  AvatarImage,
  BackButton,
  ButtonsList,
  Container,
  ContainerHeading,
  DeleteButton,
  EditButton,
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

const ViewPatientRecordsScreen = () => {
  const { aadharNumber: patientAadharNumber } = useParams()

  const [avatarImageUrl, setAvatarImageUrl] = useState('')

  const navigate = useNavigate()

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

  const hospitalDeletePatientRecord = useSelector(
    (state) => state.hospitalDeletePatientRecord
  )
  const { error: errorDelete, success: successDelete } =
    hospitalDeletePatientRecord

  const dispatch = useDispatch()
  const [filteredRecords, setFilteredRecords] = useState([])

  useEffect(() => {
    if (!hospitalInfo) {
      navigate('/hospital/login')
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

      if (patient.records) {
        let arr = []
        patient.records.forEach((record) => {
          if (record.hospitalId === hospitalInfo._id) {
            arr.push(record)
          }
        })
        setFilteredRecords(arr)
      }
    }

    if (successDelete) {
      navigate(0)
    }
  }, [
    hospitalInfo,
    navigate,
    dispatch,
    patient,
    patientAadharNumber,
    successDelete,
  ])

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
    '',
  ]

  const deleteHandler = (recordId) => {
    if (window.confirm('Are you sure you want to delete the record?')) {
      dispatch(deleteHospitalPatientRecord(patientAadharNumber, recordId))
    }
  }
  return (
    <>
      <Navbar />
      <Container>
        <BackButton to='/hospital/dashboard'>{'< '}Back</BackButton>
        {errorDelete && <Alert error message={errorDelete} />}
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
                  {filteredRecords && filteredRecords.length === 0 ? (
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
                            {filteredRecords &&
                              filteredRecords.map((record, index) => (
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
                                  <TableData data-heading=''>
                                    <ButtonsList>
                                      <EditButton
                                        to={`/hospital/dashboard/${patientAadharNumber}/record/${record._id}/edit`}
                                      >
                                        <UilEdit size='18' color='#fff' />
                                      </EditButton>
                                      <DeleteButton
                                        onClick={() =>
                                          deleteHandler(record._id)
                                        }
                                      >
                                        <UilTrashAlt size='18' color='#fff' />
                                      </DeleteButton>
                                    </ButtonsList>
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

export default ViewPatientRecordsScreen
