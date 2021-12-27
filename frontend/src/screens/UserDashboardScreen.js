import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import { UilSignOutAlt, UilPlusCircle } from '@iconscout/react-unicons'
import MemberCard from '../components/MemberCard'

const DashboardContainer = styled.div`
  position: relative;
  top: 70px;
  left: 0;
  //height: 90vh;
  width: 100%;
  padding: 20px 75px 20px;
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
  width: 25%;

  @media (max-width: 1000px) {
    margin-bottom: 10px;
  }
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
  background-color: transparent;
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
const DashboardUserPhone = styled.h4`
  font-family: 'Montserrat';
  color: #000;
  font-weight: 600;
  margin-bottom: 40px;
`

const PhoneNumber = styled.span`
  color: #212121;
`

const MemberDetailsHeading = styled.h2`
  font-family: 'Poppins';
  font-weight: 700;
  color: #54586a;
  margin-bottom: 10px;
`

const MemberCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  //background-color: pink;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
  }
`

const AddMemberButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Quicksand';
  background-color: #2dd6c1;
  color: #fff;
  border: 2px solid #2dd6c1;
  outline: none;
  padding: 6px 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #2dd6c1;
    background-color: transparent;
  }
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
        <MemberDetailsHeading>Member Details</MemberDetailsHeading>
        <MemberCardList>
          <MemberCard
            fullName='Kunal Kumar Verma'
            gender='Male'
            dob='10/10/2001'
            bloodGroup='O+'
            aadharNum='789654123652'
            age='20'
          />
          <MemberCard
            fullName='Chamma Sarraf'
            gender='Female'
            dob='12/07/2000'
            bloodGroup='O+'
            aadharNum='785448652158'
            age='21'
          />
          <MemberCard
            fullName='Hermione Granger'
            gender='Female'
            dob='9/05/1990'
            bloodGroup='B+'
            aadharNum='759614562875'
            age='31'
          />
        </MemberCardList>
        <AddMemberButton>
          Add Member <UilPlusCircle size='25' />
        </AddMemberButton>
      </DashboardContainer>
    </>
  )
}

export default UserDashboardScreen
