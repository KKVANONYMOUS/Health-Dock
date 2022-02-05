import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  top: 70px;
  left: 0;
  width: 100%;
  padding: 20px 75px 20px;
  background-color: #f8f8fa;
  height: calc(100vh - 70px);

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

export const BackButton = styled(Link)`
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

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`

export const FirstColumn = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  padding: 10px;

  @media (max-width: 1000px) {
    width: 100%;
  }
`

export const SecondColumn = styled.div`
  width: 70%;
  padding: 10px;

  @media (max-width: 1000px) {
    width: 100%;
  }
`

export const FirstContainer = styled.div`
  background-color: #fff;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  margin-bottom: 20px;
`

export const AvatarImage = styled.img`
  max-width: 200px;
  max-height: 140px;
  width: 45%;
  border-radius: 15px;
  margin-bottom: 15px;

  @media (max-width: 1000px) {
    width: auto;
    margin: 0 15px;
  }
`

export const ProfileName = styled.h2`
  color: #496bf2;
  font-family: 'Montserrat';
  font-weight: 800;
`

export const SecondContainer = styled(FirstContainer)`
  text-align: left;
  padding: 20px;
  margin-bottom: 0;
`

export const ContainerHeading = styled.h4`
  color: #35484e;
  font-family: 'Poppins';
  font-weight: 800;
  margin-bottom: 10px;
`

export const InfoField = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const InfoFieldLabel = styled.h5`
  color: #35484e;
  font-family: 'Quicksand';
  font-weight: 800;
  width: 50%;
`

export const InfoFieldData = styled.p`
  color: #7c7f8c;
  font-family: 'Montserrat';
  font-weight: 500;
  width: 50%;
  font-size: 13px;
`

export const SecondColumnContainer = styled.div`
  background-color: #fff;
  border-radius: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Heading = styled.h1`
  color: #496bf2;
  font-family: 'Poppins';
  font-weight: 800;
  margin-bottom: 20px;
`

export const Form = styled.form`
  width: 50%;

  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 2rem;
    margin-bottom: 30px;
  }
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
  margin-bottom: 10px;
`

export const FormInput = styled.input`
  border: none;
  border-bottom: 3px solid #2dd6c1;
  outline: none;
  width: 100%;
  height: 30px;
  padding: 5px;
  font-family: 'Quicksand';
  font-weight: 600;
  font-size: 14px;
`

export const InputFile = styled.input`
  font-family: 'Poppins';
  margin-top: 5px;

  ::-webkit-file-upload-button {
    font-family: 'Poppins';
    background-color: #fff;
    cursor: pointer;
    border: 2px solid #54586a;
    color: #54586a;
    padding: 5px 10px;
    transition: all 0.15s linear;
    &:hover {
      background-color: #54586a;
      color: #fff;
    }
  }
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
  outline: none;
  margin-top: ${({ errorMessage }) => (errorMessage ? '5px' : '20px')};
`

export const ErrorMessage = styled.h6`
  color: red;
  font-style: italic;
`
