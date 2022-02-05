import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  position: relative;
  top: 70px;
  left: 0;
  height: calc(100vh - 70px);
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

export const Heading = styled.h1`
  font-family: 'Poppins';
  font-weight: 700;
  color: #496bf2;
  margin-bottom: 10px;
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

export const Form = styled.form`
  width: 50%;
  margin-bottom: 30px;

  @media (max-width: 1000px) {
    width: 100%;
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

  &.rightMargin {
    margin-right: 10px;
  }
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
  outline: none;
  margin-top: ${({ errorMessage }) => (errorMessage ? '5px' : '20px')};
`

export const UtilityContainer = styled.div`
  display: flex;
`

export const ErrorMessage = styled.h6`
  color: red;
  font-style: italic;
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

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`
