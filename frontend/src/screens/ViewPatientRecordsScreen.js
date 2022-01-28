import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'
import Alert from '../components/Alert'
import {
  deleteHospitalPatientRecord,
  fetchHospitalPatientDetails,
} from '../redux/hospital/hospitalActions'
import { UilTrashAlt, UilEdit } from '@iconscout/react-unicons'

const Container = styled.div`
  position: relative;
  top: 70px;
  left: 0;
  width: 100%;
  padding: 20px 75px 20px;
  background-color: #f8f8fa;
  //background-color: cyan;
  //height: calc(100vh - 70px);

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
  margin: 20px 0;

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
  width: 45%;
  border-radius: 20px;
  margin-bottom: 15px;

  @media (max-width: 1000px) {
    width: auto;
    margin: 0 20px;
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
  padding: 10px 0px;
  //height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //background-color: yellow;
`

const Heading = styled.h1`
  color: #496bf2;
  font-family: 'Poppins';
  font-weight: 800;
  margin-bottom: 10px;
  //background-color: yellow;
`

const RecordTableContainer = styled.div`
  width: 100%;
  max-height: 457px;
  height: 65vh;
  //background-color: orange;
  overflow-y: auto;
`

const TableContainer = styled.div`
  max-width: 800px;
  width: 90%;
  margin: 0 auto 40px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHeadBox = styled.thead`
  background-color: transparent;

  @media (max-width: 767px) {
    display: none;
  }
`

const TableRow = styled.tr`
  background-color: transparent;

  &:nth-child(even) {
    background-color: #f1f1f1;
  }

  @media (max-width: 767px) {
    display: block;
    margin-bottom: 20px;
  }
`

const TableHeading = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 0.9rem;

  @media (max-width: 767px) {
    display: block;
    margin-bottom: 5px;
  }
`

const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 0.75rem;

  @media (max-width: 767px) {
    display: block;
    position: relative;
    padding-left: 132px;
    text-align: left;
    border-bottom: 0;
    font-size: 0.7rem;

    &:last-child {
      border-bottom: 1px solid #ddd;
    }

    &:before {
      content: attr(data-heading);
      position: absolute;
      top: 0;
      left: 0;
      width: 120px;
      height: 100%;
      display: flex;
      align-items: center;
      background-color: #2dd6c1;
      color: #000;
      font-weight: 800;
      font-size: 0.75rem;
      padding: 0 5px;
      justify-content: center;
    }
  }
`

const TableBody = styled.tbody``

const Message = styled.div`
  width: 90%;
  color: #4b464b;
  padding: 20px 20px;
  border: 1px solid #4b464b;
  background-color: #e2e2e4;
  font-family: 'Montserrat';
  font-weight: 500;
  text-align: center;
`

const ButtonsList = styled.div`
  display: flex;
`

const EditButton = styled(Link)`
  text-decoration: none;
  background-color: #ffc006;
  padding: 2.5px 3px;
`

const DeleteButton = styled.button`
  background-color: #dc3444;
  border: none;
  outline: none;
  padding: 2.5px 3px;
  cursor: pointer;
`

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
        setAvatarImageUrl(
          `https://ui-avatars.com/api/?name=${patient.name}&background=eee&color=007bff&bold=true&format=svg`
        )
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
                  {patient.reports && patient.reports.length === 0 ? (
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
                            {patient.reports &&
                              patient.reports.map((record, index) => (
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
                                    {record.hospital}
                                  </TableData>
                                  <TableData data-heading='DATE'>
                                    {toDate(record.date).toLocaleDateString(
                                      'en-UK'
                                    )}
                                  </TableData>
                                  <TableData data-heading='REPORT'>
                                    {record.report}
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
