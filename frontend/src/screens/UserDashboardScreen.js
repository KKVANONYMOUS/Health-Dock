import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import { UilSignOutAlt } from '@iconscout/react-unicons'

const DashboardContainer = styled.div`
  position: relative;
  top: 70px;
  left: 0;
  height: 90vh;
  width: 100%;
  padding: 20px 75px 0px;
  //background-color: cyan;
`
const DashboardContainerFirstRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  //background-color: yellow;
  margin-bottom: 20px;
`

const DashboardHeadingContainer = styled.div`
  width: 25%;
`
const DashboardHeading = styled.h1`
  color: #496bf2;
  font-family: 'Poppins';
  font-weight: 700;
  font-size: 2.6rem;
  //background-color: violet;
`
const DashboardHeadingUnderline = styled.hr`
  height: 6px;
  border-width: 0;
  background-color: #2dd6c1;
  width: 40%;
  text-align: left;
  margin-left: 0;
`

const LogoutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Quicksand';
  background-color: transparent;
  color: #2d2d3a;
  border: 2px solid #2d2d3a;
  padding: 8px 40px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #2d2d3a;
    color: #fff;
  }
`
const DashboardUserPhone = styled.h4`
  font-family: 'Montserrat';
  color: #000;
  font-weight: 600;
`

const PhoneNumber = styled.span`
  color: #212121;
`
const UserDashboardScreen = () => {
  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {
    if (!userInfo) {
      navigate('/user/auth')
    }
  }, [navigate, userInfo])
  return (
    <>
      <Navbar />
      <DashboardContainer>
        <DashboardContainerFirstRow>
          <DashboardHeadingContainer>
            <DashboardHeading>Dashboard</DashboardHeading>
            <DashboardHeadingUnderline />
          </DashboardHeadingContainer>
          <LogoutButton>
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
      </DashboardContainer>
    </>
  )
}

export default UserDashboardScreen
