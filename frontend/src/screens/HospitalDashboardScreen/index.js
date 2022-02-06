import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UilSignOutAlt } from '@iconscout/react-unicons'
import Navbar from '../../components/Navbar/'
import Spinner from '../../components/Spinner/'
import Alert from '../../components/Alert/'
import HospitalIcon from '../../icons/HospitalIcon.png'
import InfoIcon from '../../icons/InfoIcon.png'
import ManageProfileIcon from '../../icons/ManageProfileIcon.svg'
import ImportantInstructionsIcon from '../../icons/ImportantInstructionsIcon.svg'
import {
  fetchAadharNumberList,
  logoutHospital,
} from '../../redux/hospital/hospitalActions'
import {
  DashboardContainer,
  DashboardContainerFirstRow,
  DashboardHeadingContainer,
  DashboardHeading,
  HospitalIconImage,
  DashboardHeadingUnderline,
  LogoutButton,
  DashboardContainerSecondRow,
  HospitalInfoContainer,
  HospitalInfoHeadingContainer,
  HospitalInfoIcon,
  HospitalInfoHeading,
  HospitalInfoItem,
  HospitalInfoLabel,
  HospitalInfoFieldOutput,
  HospitalPatientContainer,
  HospitalPatientHeadingContainer,
  HospitalPatientIcon,
  HospitalPatientHeading,
  Form,
  FormInputContainer,
  FormLabel,
  FormInput,
  FormSelectInput,
  ErrorMessage,
  FormSubmitButton,
  DashboardContainerThirdRowContainer,
  InstructionHeadingContainer,
  InstructionHeadingIcon,
  InstructionHeading,
  ListContainer,
  ListItem,
} from './style'

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
    } else {
      alert('Aadhar Number does not exist!')
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
              <HospitalInfoLabel>ADDRESS</HospitalInfoLabel>
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
            <ListItem>Documents must be in .png, .jpeg or .jpg format</ListItem>
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
