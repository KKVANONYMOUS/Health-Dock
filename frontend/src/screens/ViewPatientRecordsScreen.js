import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'
import Alert from '../components/Alert'
import { fetchHospitalPatientDetails } from '../redux/hospital/hospitalActions'

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

  const dispatch = useDispatch()

  useEffect(() => {
    if (!hospitalInfo) {
      navigate('/hospital/login')
    } else {
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
    }
  }, [hospitalInfo, navigate, dispatch, patient, patientAadharNumber])

  const toDate = (dob) => {
    const formatDOB = new Date(dob)
    return formatDOB
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
                  <Heading>Patient Records</Heading>
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
