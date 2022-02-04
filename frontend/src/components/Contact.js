import { useState } from 'react'
import emailjs from '@emailjs/browser'
import styled from 'styled-components'
import ContactImage from '../images/ContactImage.png'
import Spinner from './Spinner'

const Container = styled.section`
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
    align-items: center;
  }
`
const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const InnerContentContainer = styled.div`
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

const Image = styled.img`
  width: 40%;

  @media (max-width: 1000px) {
    display: none;
  }
`

const Title = styled.p`
  font-family: 'Poppins';
  font-weight: 800;
  width: 100%;
  color: #2d2d3a;
  font-size: 3.5rem;

  @media (max-width: 1000px) {
    font-size: 2.2rem;
  }
`
const SubHeadingContainer = styled.div`
  width: 100%;
`

const SubHeading = styled.p`
  font-family: 'Montserrat';
  font-weight: 500;
  color: #54586a;
  font-size: 0.9rem;
  margin-bottom: 30px;
`

const Form = styled.form`
  width: 100%;
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
  margin-bottom: 25px;
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
`

const FormTextarea = styled.textarea`
  width: 100%;
  outline: none;
  border: 3px solid #2dd6c1;
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 15px;
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
  margin-top: ${({ errorMessage }) => (errorMessage ? '5px' : '0')};
`

const ErrorMessage = styled.h6`
  color: red;
  font-style: italic;
`

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')
    if (name === '' || email === '' || subject === '' || message === '') {
      setErrorMessage('Fill all fields')
      setLoading(false)
      return
    }

    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setErrorMessage('Please give valid email')
      setLoading(false)
      return
    }
    setErrorMessage('')

    var mailConfig = {
      name,
      email,
      subject,
      message,
    }

    emailjs
      .send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        mailConfig,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          setLoading(false)
          alert('Message sent successfully')
          setName('')
          setEmail('')
          setSubject('')
          setMessage('')
        },
        (error) => {
          setLoading(false)
          alert('Some error occurred')
          setName('')
          setEmail('')
          setSubject('')
          setMessage('')
        }
      )
  }

  return (
    <Container id='contact'>
      <InnerContainer>
        <Image src={ContactImage} alt='Contact Image' />
        <InnerContentContainer>
          <Title>CONTACT US!!</Title>
          <SubHeadingContainer>
            <SubHeading>
              Any questions, remarks or queries? Just write us a message!
            </SubHeading>
          </SubHeadingContainer>
          <Form onSubmit={handleSubmit}>
            <FormInputContainer>
              <FormLabel>NAME</FormLabel>
              <FormInput
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormInputContainer>
            <FormInputContainer>
              <FormLabel>EMAIL ADDRESS</FormLabel>
              <FormInput
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormInputContainer>
            <FormInputContainer className='rightMargin'>
              <FormLabel>SUBJECT</FormLabel>
              <FormInput
                type='text'
                placeholder='Enter subject'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </FormInputContainer>
            <FormInputContainer>
              <FormLabel>MESSAGE</FormLabel>
              <FormTextarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormInputContainer>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <FormSubmitButton type='submit' errorMessage={errorMessage}>
              {loading ? <Spinner width={18} height={18} /> : 'Send Message'}
            </FormSubmitButton>
          </Form>
        </InnerContentContainer>
      </InnerContainer>
    </Container>
  )
}

export default Contact
