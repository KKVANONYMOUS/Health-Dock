import styled from 'styled-components'
import ContactImage from '../images/ContactImage.png'

const Container = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 90vh;
  width: 100%;
  background-color: #fff;

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
const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  //background-color: grey;
  margin-bottom: 50px;

  @media (max-width: 1000px) {
    //align-items: start;
  }
`
const InnerContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  //background-color: yellow;
  height: 70%;
  width: 50%;
  padding-left: 80px;

  @media (max-width: 1000px) {
    height: 100%;
    width: 100%;
    padding-left: 30px;
  }
`

const Image = styled.img`
  width: 40%;

  @media (max-width: 1000px) {
    display: none;
  }
`

const Title = styled.h1`
  font-family: 'Poppins';
  color: #496bf2;
  font-size: 3.5rem;
  margin-bottom: 0;
  //background-color: pink;

  @media (max-width: 1000px) {
    font-size: 2.5rem;
  }
`
const SloganContainer = styled.div`
  width: 100%;
  //background-color: green;
`

const Slogan = styled.h3`
  font-family: 'Montserrat';
  font-weight: 500;
  color: #54586a;
  font-size: 1rem;
  margin: 0 0 45px 0;
`

const Form = styled.form`
  width: 85%;
  margin-bottom: 50px;
  //background-color: pink;
`

const FormLabel = styled.h3`
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
  margin-bottom: 30px;

  &.rightMargin {
    margin-right: 10px;
  }
`

const FormInput = styled.input`
  border: none;
  border-bottom: 3px solid #2dd6c1;
  outline: none;
  width: 100%;
  height: 30px;
  padding: 5px;
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 15px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

   {
    -moz-appearance: textfield;
  }
`

const FormSubmitButton = styled.button`
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
  margin-top: ${({ errorMessage }) => (errorMessage ? '5px' : '20px')};
`

const FormTextarea = styled.textarea`
  width: 100%;
  outline: none;
  border: 3px solid #2dd6c1;
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 15px;
`

const Contact = () => {
  return (
    <Container>
      <InnerContainer>
        <Image src={ContactImage} alt='Contact Image' />
        <InnerContentContainer>
          <Title>CONTACT US!!</Title>
          <SloganContainer>
            <Slogan>
              Any questions, remarks or queries? Just write us a message!
            </Slogan>
          </SloganContainer>
          <Form>
            <FormInputContainer>
              <FormLabel>NAME</FormLabel>
              <FormInput type='text' placeholder='Enter Name' />
            </FormInputContainer>
            <FormInputContainer>
              <FormLabel>EMAIL ADDRESS</FormLabel>
              <FormInput type='email' placeholder='Enter Email' />
            </FormInputContainer>
            <FormInputContainer className='rightMargin'>
              <FormLabel>SUBJECT</FormLabel>
              <FormInput type='text' placeholder='Subject' />
            </FormInputContainer>
            <FormInputContainer>
              <FormLabel>MESSAGE</FormLabel>
              <FormTextarea />
            </FormInputContainer>
            <FormSubmitButton type='submit'>SUBMIT</FormSubmitButton>
          </Form>
        </InnerContentContainer>
      </InnerContainer>
    </Container>
  )
}

export default Contact
