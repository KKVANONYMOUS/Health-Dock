import styled from 'styled-components'

export const DashboardContainer = styled.div`
  position: relative;
  top: 70px;
  left: 0;
  width: 100%;
  padding: 20px 75px 20px;
  background-color: #f8f8fa;
  min-height: calc(100vh - 70px);

  @media (max-width: 767px) {
    padding-left: 15px;
    padding-right: 15px;
    min-height: calc(100vh - 70px);
    height: inherit;
  }

  @media (width: 768px) and (height: 1024px) {
    height: 55vh;
    padding-left: 15px;
    padding-right: 15px;
    min-height: calc(100vh - 70px);
    height: inherit;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    justify-content: center;
    padding-left: 15px;
    padding-right: 15px;
    min-height: calc(100vh - 70px);
    height: inherit;
  }
`

export const DashboardContainerFirstRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: start;
  }
`

export const DashboardHeadingContainer = styled.div`
  width: 25%;

  @media (max-width: 1000px) {
    margin-bottom: 10px;
  }
`

export const DashboardHeading = styled.h1`
  color: #496bf2;
  font-family: 'Poppins';
  font-weight: 700;
  font-size: 2.6rem;
`

export const DashboardHeadingUnderline = styled.hr`
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

export const LogoutButton = styled.button`
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

export const DashboardUserPhone = styled.h4`
  font-family: 'Montserrat';
  color: #000;
  font-weight: 600;
  margin-bottom: 40px;
`

export const PhoneNumber = styled.span`
  color: #212121;
`

export const MemberDetailsHeading = styled.h2`
  font-family: 'Poppins';
  font-weight: 700;
  color: #54586a;
  margin-bottom: 10px;
`

export const MemberCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
  }
`

export const AddMemberButton = styled.button`
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

export const UtilityContainer = styled.div`
  width: 100%;
  text-align: center;
`

export const Message = styled.div`
  width: 100%;
  color: #4b464b;
  padding: 20px 20px;
  border: 1px solid #4b464b;
  background-color: #e2e2e4;
  font-family: 'Montserrat';
  font-weight: 500;
  text-align: center;
`
