import styled from 'styled-components'

export const Container = styled.section`
  position: relative;
  top: 10vh;
  left: 0;
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f8f8fa;

  @media (max-width: 1000px) {
    padding: 20px 30px;
    align-items: center;
  }
`
export const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const InnerContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 80px;

  @media (max-width: 1000px) {
    height: 100%;
    width: 100%;
    margin-left: 0;
  }
`

export const Image = styled.img`
  width: 40%;

  @media (max-width: 1000px) {
    display: none;
  }
`

export const Title = styled.p`
  font-family: 'Poppins';
  font-weight: 800;
  width: 100%;
  color: #2d2d3a;
  font-size: 3.5rem;

  @media (max-width: 1000px) {
    font-size: 2.2rem;
  }
`
export const SubHeadingContainer = styled.div`
  width: 100%;
`

export const SubHeading = styled.p`
  font-family: 'Montserrat';
  font-weight: 500;
  color: #54586a;
  font-size: 0.9rem;
  margin-bottom: 30px;
`

export const Form = styled.form`
  width: 100%;
`

export const FormLabel = styled.h3`
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
  border-bottom: 3px solid #2dd6c1;
  outline: none;
  width: 100%;
  height: 30px;
  padding: 5px;
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 15px;
`

export const FormTextarea = styled.textarea`
  width: 100%;
  outline: none;
  border: 3px solid #2dd6c1;
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 15px;
`

export const FormSubmitButton = styled.button`
  cursor: ${({ disabled }) => (disabled ? 'no-drop' : 'pointer')};
  background-color: #2dd6c1;
  color: #fff;
  font-family: 'Quicksand';
  font-weight: 700;
  font-size: 14px;
  width: 100%;
  padding: 10px 20px;
  border: none;
  outline: none;
  margin-top: ${({ errorMessage }) => (errorMessage ? '5px' : '0')};
`

export const ErrorMessage = styled.h6`
  color: red;
  font-style: italic;
`
