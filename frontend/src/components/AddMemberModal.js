import { useRef, useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components'
import { UilMultiply } from '@iconscout/react-unicons'
import AddMemberImage from '../images/AddMemberImage.png'
import {
  createPatient,
  resetCreatePatient,
} from '../redux/patient/patientActions'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'
import Alert from './Alert'

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  z-index: 10;
  justify-content: center;
  align-items: center;
`

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;

  @media (max-width: 800px) {
    width: 100vw;
    height: 70vh;
    grid-template-columns: none;
  }
`

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #fff;

  @media (max-width: 800px) {
    display: none;
  }
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  line-height: 1.8;
  //background-color: yellow;
  color: #141414;

  @media (max-width: 800px) {
    align-items: center;
  }
`

const CloseModalButton = styled(UilMultiply)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`

const Form = styled.form`
  width: 85%;
  margin-bottom: 30px;
  //background-color: pink;
`

const FormLabel = styled.h5`
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
  margin-bottom: 10px;

  &.rightMargin {
    margin-right: 10px;
  }
`

const FormInput = styled.input`
  border: 1px solid #ccc;
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

const FormSelectInput = styled.select`
  border: 1px solid #ccc;
  outline: none;
  width: 100%;
  height: 30px;
  padding: 5px;
  font-family: 'Quicksand';
  font-weight: 600;
  font-size: 14px;
`

const FormSubmitButton = styled.button`
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

const UtilityContainer = styled.div`
  display: flex;
`
const ErrorMessage = styled.h6`
  color: red;
  font-style: italic;
`

const AddMemberModal = ({ showModal, setShowModal }) => {
  const [name, setName] = useState('')
  const [aadharNumber, setAadharNumber] = useState('')
  const [gender, setGender] = useState('Male')
  const [dob, setDob] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [age, setAge] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const patientCreate = useSelector((state) => state.patientCreate)
  const { loading, error, success } = patientCreate

  const modalRef = useRef()

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  })

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false)
    }
  }

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false)
      }
    },
    [setShowModal, showModal]
  )

  const handleSubmit = (e) => {
    e.preventDefault()

    setErrorMessage('')
    if (
      name === '' ||
      aadharNumber === '' ||
      dob === '' ||
      age === '' ||
      bloodGroup === '' ||
      gender === ''
    ) {
      setErrorMessage('Fill all fields')
      return
    }

    if (aadharNumber.toString().length !== 12) {
      setErrorMessage('Fill Valid Aadhar Number')
      return
    }
    setErrorMessage('')

    dispatch(
      createPatient(
        name,
        aadharNumber,
        dob,
        age,
        bloodGroup,
        gender,
        userInfo.phoneNumber
      )
    )
  }

  useEffect(() => {
    if (showModal) {
      setErrorMessage('')
      dispatch(resetCreatePatient())
    }

    if (!userInfo) {
      navigate('/user/auth')
    }
    document.addEventListener('keydown', keyPress)
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress, dispatch, navigate, userInfo, showModal])

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          {success && setShowModal(false)}
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalImg src={AddMemberImage} alt='Add Member Image' />
              <ModalContent>
                {error && <Alert error width='85%' message={error} />}
                <Form onSubmit={handleSubmit}>
                  <FormInputContainer>
                    <FormLabel>FULL NAME</FormLabel>
                    <FormInput
                      type='text'
                      placeholder='Enter full name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormInputContainer>

                  <FormInputContainer>
                    <FormLabel>AADHAR NUMBER</FormLabel>
                    <FormInput
                      type='number'
                      placeholder='Enter aadhar number'
                      value={aadharNumber}
                      onChange={(e) => setAadharNumber(e.target.value)}
                    />
                  </FormInputContainer>
                  <UtilityContainer>
                    <FormInputContainer className='rightMargin'>
                      <FormLabel>DOB</FormLabel>
                      <FormInput
                        type='date'
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </FormInputContainer>

                    <FormInputContainer>
                      <FormLabel>AGE</FormLabel>
                      <FormInput
                        type='number'
                        placeholder='Enter age'
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </FormInputContainer>
                  </UtilityContainer>
                  <UtilityContainer>
                    <FormInputContainer className='rightMargin'>
                      <FormLabel>GENDER</FormLabel>
                      <FormSelectInput
                        name='Gender'
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Other'>Other</option>
                      </FormSelectInput>
                    </FormInputContainer>

                    <FormInputContainer>
                      <FormLabel>BLOOD GROUP</FormLabel>
                      <FormInput
                        type='text'
                        placeholder='Enter blood group'
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                      />
                    </FormInputContainer>
                  </UtilityContainer>
                  {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                  <FormSubmitButton
                    disabled={loading}
                    errorMessage={errorMessage}
                    type='submit'
                  >
                    {loading ? (
                      <Spinner width={18} height={18} />
                    ) : (
                      'Add Member'
                    )}
                  </FormSubmitButton>
                </Form>
              </ModalContent>
              <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal((prev) => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  )
}

export default AddMemberModal
