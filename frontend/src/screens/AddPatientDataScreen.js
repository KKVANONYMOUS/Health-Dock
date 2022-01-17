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
`

const AddPatientDataScreen = () => {
  const { aadharNumber: patientAadharNumber } = useParams()

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
      }
    }
  }, [hospitalInfo, navigate, dispatch, patient, patientAadharNumber])
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
              <h1>{patient.name}</h1>
            </>
          )}
        </Wrapper>
      </Container>
    </>
  )
}

export default AddPatientDataScreen
