import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import Alert from '../components/Alert'
import Spinner from '../components/Spinner'
import { fetchPatientDetails } from '../redux/patient/patientActions'

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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 10px;
  width: 70%;
  //  grid-template-columns: auto 500px;
  //  background-color: pink;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`
const ProfileDetails = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #212121;
  //  background-color: cyan;
`

const HealthContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  //  background-color: orange;
`

const AvatarImg = styled.img`
  height: 170px;
  width: 170px;
  border: 5px solid #ccc;
  border-radius: 50%;
`

const ProfileInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  //  background-color: yellow;
  padding: 10px 10px 10px 20px;
`

const Field = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  //  background-color: green;
`

const FieldLabel = styled.h5`
  font-family: 'Poppins';
  font-weight: 600;
  color: #54586a;
  margin-right: 3px;
`

const FieldContent = styled.h5`
  font-family: 'Quicksand';
  font-weight: 400;
`
const RecordHeading = styled.h2`
  font-family: 'Montserrat';
`
const PatientDetailsScreen = () => {
  const { id: patientId } = useParams()

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
      }
    }
  }, [dispatch, navigate, userInfo, patient, patientId])

  const toDate = (dob) => {
    const formatDOB = new Date(dob)
    return formatDOB
  }
  return (
    <>
      <Navbar />
      <Container>
        <BackButton to='/user/dashboard'>{'< '}Back</BackButton>
        <Heading>{patient && patient.name}'s Profile</Heading>
        <Wrapper>
          {loadingDetails ? (
            <Spinner width={60} height={60} color='#000' />
          ) : errorDetails ? (
            <Alert error message={errorDetails} />
          ) : (
            <>
              <ProfileContainer>
                <ProfileDetails>
                  <AvatarImg
                    src={
                      patient.image
                        ? patient.image
                        : `https://ui-avatars.com/api/?name=${patient.name}&background=eee&color=007bff&bold=true&format=svg`
                    }
                    width={90}
                    height={90}
                    alt='Patient Profile Image'
                  />

                  <ProfileInfo>
                    <Field>
                      <FieldLabel>Name:</FieldLabel>
                      <FieldContent>{patient.name}</FieldContent>
                    </Field>
                    <Field>
                      <FieldLabel>Aadhar Number:</FieldLabel>
                      <FieldContent>{patient.aadharNumber}</FieldContent>
                    </Field>
                    <Field>
                      <FieldLabel>Age:</FieldLabel>
                      <FieldContent>{patient.age}</FieldContent>
                    </Field>
                    <Field>
                      <FieldLabel>DOB:</FieldLabel>
                      <FieldContent>
                        {toDate(patient.dob).toLocaleDateString('en-UK')}
                      </FieldContent>
                    </Field>
                    <Field>
                      <FieldLabel>Gender:</FieldLabel>
                      <FieldContent>{patient.gender}</FieldContent>
                    </Field>
                    <Field>
                      <FieldLabel>Blood Group:</FieldLabel>
                      <FieldContent>{patient.bloodGroup}</FieldContent>
                    </Field>
                  </ProfileInfo>
                </ProfileDetails>
                <HealthContainer>
                  <RecordHeading>Your Records</RecordHeading>
                </HealthContainer>
              </ProfileContainer>
            </>
          )}
        </Wrapper>
      </Container>
    </>
  )
}

export default PatientDetailsScreen
