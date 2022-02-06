import { useState } from 'react'
import emailjs from '@emailjs/browser'
import ContactImage from '../../images/ContactImage.png'
import Spinner from '../Spinner/'
import {
  Container,
  ErrorMessage,
  Form,
  FormInput,
  FormInputContainer,
  FormLabel,
  FormSubmitButton,
  FormTextarea,
  Image,
  InnerContainer,
  InnerContentContainer,
  SubHeading,
  SubHeadingContainer,
  Title,
} from './style'

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
        'gmail',
        'contact_template',
        mailConfig,
        'user_ymcElLtthdLPTj7MMvIsi'
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
