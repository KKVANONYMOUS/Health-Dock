import { useRef, useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddMemberImage from '../../images/AddMemberImage.png'
import {
  createPatient,
  resetCreatePatient,
} from '../../redux/patient/patientActions'
import Spinner from '../Spinner/'
import Alert from '../Alert/'
import {
  Background,
  CloseModalButton,
  ErrorMessage,
  Form,
  FormInput,
  FormInputContainer,
  FormLabel,
  FormSelectInput,
  FormSubmitButton,
  ModalContent,
  ModalImg,
  ModalWrapper,
  UtilityContainer,
} from './style'

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
                  {loading ? <Spinner width={18} height={18} /> : 'Add Member'}
                </FormSubmitButton>
              </Form>
            </ModalContent>
            <CloseModalButton
              aria-label='Close modal'
              onClick={() => setShowModal((prev) => !prev)}
            />
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  )
}

export default AddMemberModal
