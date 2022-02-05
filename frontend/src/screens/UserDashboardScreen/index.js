import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UilSignOutAlt, UilPlusCircle } from '@iconscout/react-unicons'
import Navbar from '../../components/Navbar/'
import MemberCard from '../../components/MemberCard/'
import Alert from '../../components/Alert/'
import Spinner from '../../components/Spinner/'
import AddMemberModal from '../../components/AddMemberModal/'
import { logoutUser } from '../../redux/user/userActions'
import { fetchPatientsList } from '../../redux/patient/patientActions'
import {
  AddMemberButton,
  DashboardContainer,
  DashboardContainerFirstRow,
  DashboardHeading,
  DashboardHeadingContainer,
  DashboardHeadingUnderline,
  DashboardUserPhone,
  LogoutButton,
  MemberCardList,
  MemberDetailsHeading,
  Message,
  PhoneNumber,
  UtilityContainer,
} from './style'

const UserDashboardScreen = () => {
  const [showModal, setShowModal] = useState(false)

  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const patientList = useSelector((state) => state.patientList)
  const { loading, error, patients } = patientList

  const patientCreate = useSelector((state) => state.patientCreate)
  const { success: patientCreateSuccess } = patientCreate

  const openModal = () => {
    setShowModal((prev) => !prev)
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/user/auth')
    } else {
      dispatch(fetchPatientsList())
    }
  }, [navigate, userInfo, dispatch, patientCreateSuccess])
  return (
    <>
      <Navbar />
      <AddMemberModal showModal={showModal} setShowModal={setShowModal} />
      <DashboardContainer>
        <DashboardContainerFirstRow>
          <DashboardHeadingContainer>
            <DashboardHeading>Dashboard</DashboardHeading>
            <DashboardHeadingUnderline />
          </DashboardHeadingContainer>
          <LogoutButton onClick={() => dispatch(logoutUser())}>
            <UilSignOutAlt size='25' />
            Logout
          </LogoutButton>
        </DashboardContainerFirstRow>
        <DashboardUserPhone>
          Logged In as:{' '}
          <PhoneNumber>
            XXXXX-XX
            {userInfo &&
              userInfo.phoneNumber &&
              userInfo.phoneNumber.toString().substring(7)}
          </PhoneNumber>
        </DashboardUserPhone>
        <MemberDetailsHeading>Member Details</MemberDetailsHeading>
        <MemberCardList>
          {loading ? (
            <UtilityContainer>
              <Spinner width={60} height={60} color='#212121' />
            </UtilityContainer>
          ) : error ? (
            <Alert error message={error} />
          ) : patients.length > 0 ? (
            patients.map((patient, index) => (
              <MemberCard
                key={index}
                patientId={patient.id}
                fullName={patient.name}
                gender={patient.gender}
                dob={patient.dob}
                bloodGroup={patient.bloodGroup}
                aadharNum={patient.aadharNumber.toString()}
                age={patient.age}
                image={patient.image}
              />
            ))
          ) : (
            <Message>No members to display!</Message>
          )}
        </MemberCardList>
        <AddMemberButton onClick={openModal}>
          Add Member <UilPlusCircle size='25' />
        </AddMemberButton>
      </DashboardContainer>
    </>
  )
}

export default UserDashboardScreen
