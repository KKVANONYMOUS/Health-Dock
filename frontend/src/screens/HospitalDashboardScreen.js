import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { UilSignOutAlt } from '@iconscout/react-unicons'
import HospitalIcon from '../icons/HospitalIcon.png'
import InfoIcon from '../icons/InfoIcon.png'
import ManageProfileIcon from '../icons/ManageProfileIcon.svg'
import ImportantInstructionsIcon from '../icons/ImportantInstructionsIcon.svg'
import {
  fetchAadharNumberList,
  logoutHospital,
} from '../redux/hospital/hospitalActions'
import Spinner from '../components/Spinner'
import Alert from '../components/Alert'

const DashboardContainer = styled.div`
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
const DashboardContainerFirstRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  //background-color: yellow;
  margin-bottom: 20px;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: start;
  }
`
const DashboardHeadingContainer = styled.div`
  width: 50%;

  @media (max-width: 1000px) {
    width: 25%;
    margin-bottom: 10px;
  }
`
const DashboardHeading = styled.h1`
  color: #496bf2;
  font-family: 'Poppins';
  font-weight: 700;
  font-size: 2.6rem;
  //background-color: violet;
  display: flex;
  align-items: center;
`
const DashboardHeadingUnderline = styled.hr`
  height: 6px;
  border-width: 0;
  background-color: #2dd6c1;
  width: 40%;
  text-align: left;
  margin-left: 0;

  @media (max-width: 1000px) {
    width: 100%;
  }

  @media (max-width: 426px) {
    width: 200%;
  }
`
const LogoutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Quicksand';
  background-color: #fff;
  color: #2d2d3a;
  border: 2px solid #2d2d3a;
  outline: none;
  padding: 8px 40px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #2d2d3a;
    color: #fff;
  }

  @media (max-width: 1000px) {
    padding: 2px 10px;
    font-size: 12px;
  }
`
const HospitalIconImage = styled.img`
  margin-right: 10px;
  @media (max-width: 1000px) {
    display: none;
  }
`
const DashboardContainerSecondRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
  }
`
const HospitalInfoContainer = styled.div`
  background-color: #fff;
  width: 40%;
  border-radius: 30px;
  padding: 20px;

  @media (max-width: 1000px) {
    width: 100%;
    margin-bottom: 10px;
  }
`
const HospitalInfoHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`
const HospitalInfoHeading = styled.h2`
  font-family: 'Poppins';
  font-weight: 700;
  color: #54586a;
`
const HospitalInfoIcon = styled.img`
  margin-right: 10px;

  @media (max-width: 1000px) {
    margin-right: 0;
  }
`
const HospitalInfoItem = styled.div`
  padding: 20px;
  background-color: #f6f6f7;
  border-radius: 20px;
  margin-bottom: 15px;
`
const HospitalInfoLabel = styled.h5`
  font-family: 'Poppins';
  font-weight: 600;
  color: #496bf2;
`
const HospitalInfoFieldOutput = styled.h5`
  color: #54586a;
  font-family: 'Poppins';
  font-weight: 500;
`
const HospitalPatientContainer = styled.div`
  background-color: #fff;
  width: 45%;
  border-radius: 30px;
  padding: 40px 80px;

  @media (max-width: 1000px) {
    width: 100%;
    padding: 40px 30px;
  }
`
const HospitalPatientIcon = styled(HospitalInfoIcon)``

const HospitalPatientHeadingContainer = styled(HospitalInfoHeadingContainer)`
  margin-bottom: 30px;
`
const HospitalPatientHeading = styled(HospitalInfoHeading)``

const Form = styled.form`
  margin-bottom: 30px;
  //background-color: pink;
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
  margin-bottom: 25px;
`
const FormInput = styled.input`
  border: none;
  border-bottom: 3px solid #496bf2;
  outline: none;
  width: 100%;
  height: 30px;
  padding: 5px;
  font-family: 'Quicksand';
  font-weight: 600;
  font-size: 14px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

   {
    -moz-appearance: textfield;
  }
`
const FormSelectInput = styled.select`
  border: 1px solid #ccc;
  outline: none;
  width: 100%;
  height: 30px;
  padding: 5px;
  font-family: 'Quicksand';
  font-weight: 600;
  font-size: 14px;
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
  border-radius: 20px;
  outline: none;
  margin-top: ${({ errorMessage }) => (errorMessage ? '5px' : '20px')};
`
const DashboardContainerThirdRowContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 50px;
  margin-bottom: 10px;
`
const InstructionHeadingContainer = styled.div`
  display: flex;
  align-items: center;
`

const InstructionHeadingIcon = styled(HospitalInfoIcon)`
  margin-right: 0;
`

const InstructionHeading = styled.h4`
  color: #000;
  font-family: 'Poppins';
  font-weight: 600;
`
const ListContainer = styled.ol`
  padding: 5px 20px;
`

const ListItem = styled.li`
  color: #000;
  font-family: 'Quicksand';
  font-weight: 400;
  font-size: 13px;
`
const ErrorMessage = styled.h6`
  color: red;
  font-style: italic;
  margin-bottom: 5px;
`
const HospitalDashboardScreen = () => {
  const [aadharNumber, setAadharNumber] = useState('')
  const [action, setAction] = useState('New Record')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()
  const hospitalLogin = useSelector((state) => state.hospitalLogin)
  const { hospitalInfo } = hospitalLogin

  const hospitalPatientDetails = useSelector(
    (state) => state.hospitalPatientDetails
  )
  const { error, loading } = hospitalPatientDetails

  const aadharNumberList = useSelector((state) => state.aadharNumberList)
  const { aadharNumbers: aadharNumbersArr } = aadharNumberList

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (aadharNumber === '' || aadharNumber.trim().length !== 12) {
      setErrorMessage('Please give a valid input')
      return
    }

    setErrorMessage('')
    let isAadharExist = false
    if (aadharNumbersArr) {
      aadharNumbersArr.forEach((element) => {
        if (aadharNumber === element) {
          isAadharExist = true
        }
      })
    }

    if (isAadharExist) {
      if (action === 'New Record') {
        navigate(`/hospital/dashboard/${aadharNumber}/new`)
      } else {
        navigate(`/hospital/dashboard/${aadharNumber}/`)
      }
    }
  }

  useEffect(() => {
    if (!hospitalInfo) {
      navigate('/hospital/login')
    } else {
      dispatch(fetchAadharNumberList())
    }
  }, [hospitalInfo, navigate, action, dispatch])

  return (
    <>
      <Navbar />
      <DashboardContainer>
        <DashboardContainerFirstRow>
          <DashboardHeadingContainer>
            <DashboardHeading>
              <HospitalIconImage
                src={HospitalIcon}
                width={40}
                height={40}
                alt='Hospital Icon'
              />
              {hospitalInfo && hospitalInfo.name}
            </DashboardHeading>
            <DashboardHeadingUnderline />
          </DashboardHeadingContainer>
          <LogoutButton onClick={() => dispatch(logoutHospital())}>
            <UilSignOutAlt size='25' />
            Logout
          </LogoutButton>
        </DashboardContainerFirstRow>
        <DashboardContainerSecondRow>
          <HospitalInfoContainer>
            <HospitalInfoHeadingContainer>
              <HospitalInfoIcon
                src={InfoIcon}
                width={20}
                height={20}
                alt='Info Icon'
              />
              <HospitalInfoHeading>Info</HospitalInfoHeading>
            </HospitalInfoHeadingContainer>
            <HospitalInfoItem>
              <HospitalInfoLabel>REGISTRATION NUMBER</HospitalInfoLabel>
              <HospitalInfoFieldOutput>
                {hospitalInfo && hospitalInfo.registrationNumber}
              </HospitalInfoFieldOutput>
            </HospitalInfoItem>
            <HospitalInfoItem>
              <HospitalInfoLabel>NewRESS</HospitalInfoLabel>
              <HospitalInfoFieldOutput>
                {hospitalInfo && hospitalInfo.address}
              </HospitalInfoFieldOutput>
            </HospitalInfoItem>
            <HospitalInfoItem>
              <HospitalInfoLabel>PHONE NUMBER</HospitalInfoLabel>
              <HospitalInfoFieldOutput>
                {hospitalInfo && hospitalInfo.phoneNumber}
              </HospitalInfoFieldOutput>
            </HospitalInfoItem>
          </HospitalInfoContainer>
          <HospitalPatientContainer>
            <HospitalPatientHeadingContainer>
              <HospitalPatientIcon
                src={ManageProfileIcon}
                width={40}
                height={40}
                alt='Manage Profile Icon'
              />
              <HospitalPatientHeading>Manage Profile</HospitalPatientHeading>
            </HospitalPatientHeadingContainer>
            {error && <Alert error message={error} />}
            <Form onSubmit={handleSubmit}>
              <FormInputContainer>
                <FormLabel>AADHAR NUMBER</FormLabel>
                <FormInput
                  type='number'
                  placeholder='Enter aadhar number'
                  value={aadharNumber}
                  onChange={(e) => setAadharNumber(e.target.value)}
                />
              </FormInputContainer>
              <FormInputContainer>
                <FormLabel>SELECT ACTION</FormLabel>
                <FormSelectInput
                  name='Action'
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                >
                  <option value='New Record'>New Record</option>
                  <option value='View Records'>View Records</option>
                </FormSelectInput>
              </FormInputContainer>
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
              <FormSubmitButton
                disabled={loading}
                errorMessage={errorMessage}
                type='submit'
              >
                {loading ? <Spinner width={18} height={18} /> : 'PROCEED >'}
              </FormSubmitButton>
            </Form>
          </HospitalPatientContainer>
        </DashboardContainerSecondRow>
        <DashboardContainerThirdRowContainer>
          <InstructionHeadingContainer>
            <InstructionHeadingIcon
              src={ImportantInstructionsIcon}
              width={30}
              height={30}
              alt='Instruction Heading Icon'
            />
            <InstructionHeading>Important Instructions</InstructionHeading>
          </InstructionHeadingContainer>
          <ListContainer>
            <ListItem>Patient must have a valid Aadhar Number</ListItem>
            <ListItem>
              Patient's Aadhar number must be registered on Health Dock through
              a valid phone number
            </ListItem>
            <ListItem>Documents must be in .png or .pdf format</ListItem>
            <ListItem>
              Document will not be recovered if once edited or deleted
            </ListItem>
            <ListItem>
              Patient will be notified through SMS if any changes are done in
              their records
            </ListItem>
          </ListContainer>
        </DashboardContainerThirdRowContainer>
      </DashboardContainer>
    </>
  )
}

export default HospitalDashboardScreen
