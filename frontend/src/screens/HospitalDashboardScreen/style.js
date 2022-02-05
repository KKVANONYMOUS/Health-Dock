import styled from 'styled-components'

export const DashboardContainer = styled.div`
  position: relative;
  top: 70px;
  left: 0;
  width: 100%;
  padding: 20px 75px 20px;
  background-color: #f8f8fa;

  @media (max-width: 767px) {
    padding-left: 15px;
    padding-right: 15px;
  }

  @media (width: 768px) and (height: 1024px) {
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
  width: 50%;

  @media (max-width: 1000px) {
    width: 25%;
    margin-bottom: 10px;
  }
`

export const DashboardHeading = styled.h1`
  color: #496bf2;
  font-family: 'Poppins';
  font-weight: 700;
  font-size: 2.6rem;
  display: flex;
  align-items: center;
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

export const HospitalIconImage = styled.img`
  margin-right: 10px;
  @media (max-width: 1000px) {
    display: none;
  }
`

export const DashboardContainerSecondRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
  }
`

export const HospitalInfoContainer = styled.div`
  background-color: #fff;
  width: 40%;
  border-radius: 30px;
  padding: 20px;

  @media (max-width: 1000px) {
    width: 100%;
    margin-bottom: 10px;
  }
`

export const HospitalInfoHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

export const HospitalInfoHeading = styled.h2`
  font-family: 'Poppins';
  font-weight: 700;
  color: #54586a;
`

export const HospitalInfoIcon = styled.img`
  margin-right: 10px;

  @media (max-width: 1000px) {
    margin-right: 0;
  }
`

export const HospitalInfoItem = styled.div`
  padding: 20px;
  background-color: #f6f6f7;
  border-radius: 20px;
  margin-bottom: 15px;
`

export const HospitalInfoLabel = styled.h5`
  font-family: 'Poppins';
  font-weight: 600;
  color: #496bf2;
`

export const HospitalInfoFieldOutput = styled.h5`
  color: #54586a;
  font-family: 'Poppins';
  font-weight: 500;
`

export const HospitalPatientContainer = styled.div`
  background-color: #fff;
  width: 45%;
  border-radius: 30px;
  padding: 40px 80px;

  @media (max-width: 1000px) {
    width: 100%;
    padding: 40px 30px;
  }
`

export const HospitalPatientIcon = styled(HospitalInfoIcon)``

export const HospitalPatientHeadingContainer = styled(
  HospitalInfoHeadingContainer
)`
  margin-bottom: 30px;
`
export const HospitalPatientHeading = styled(HospitalInfoHeading)``

export const Form = styled.form`
  margin-bottom: 30px;
`

export const FormLabel = styled.h5`
  font-family: 'Poppins';
  font-weight: 600;
  color: #2dd6c1;
`

export const FormInputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-bottom: 25px;
`

export const FormInput = styled.input`
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

export const FormSelectInput = styled.select`
  border: 1px solid #ccc;
  outline: none;
  width: 100%;
  height: 30px;
  padding: 5px;
  font-family: 'Quicksand';
  font-weight: 600;
  font-size: 14px;
`

export const FormSubmitButton = styled.button`
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

export const DashboardContainerThirdRowContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 50px;
  margin-bottom: 10px;
`

export const InstructionHeadingContainer = styled.div`
  display: flex;
  align-items: center;
`

export const InstructionHeadingIcon = styled(HospitalInfoIcon)`
  margin-right: 0;
`

export const InstructionHeading = styled.h4`
  color: #000;
  font-family: 'Poppins';
  font-weight: 600;
`

export const ListContainer = styled.ol`
  padding: 5px 20px;
`

export const ListItem = styled.li`
  color: #000;
  font-family: 'Quicksand';
  font-weight: 400;
  font-size: 13px;
`

export const ErrorMessage = styled.h6`
  color: red;
  font-style: italic;
  margin-bottom: 5px;
`
