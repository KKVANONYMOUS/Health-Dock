import React, { useRef, useEffect, useCallback, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components'
import { UilMultiply } from '@iconscout/react-unicons'
import AddMemberImage from './AddMemberImage.png'

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
`

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #fff;

  @media (max-width: 1000px) {
    display: none;
  }
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  line-height: 1.8;
  //padding: 5px;
  //background-color: yellow;
  color: #141414;
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
  //margin-right: 10px;
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
  cursor: pointer;
  background-color: #2dd6c1;
  color: #fff;
  font-family: 'Quicksand';
  font-weight: 500;
  width: 100%;
  padding: 10px 20px;
  border: none;
  outline: none;
  margin-top: 20px;
`
const UtilityContainer = styled.div`
  display: flex;
`
const AddMemberModal = ({ showModal, setShowModal }) => {
  const [name, setName] = useState('')
  const [aadharNum, setAadharNum] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [age, setAge] = useState('')

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
        console.log('I pressed')
      }
    },
    [setShowModal, showModal]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress])

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalImg src={AddMemberImage} alt='Add Member Image' />
              <ModalContent>
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
                      value={aadharNum}
                      onChange={(e) => setAadharNum(e.target.value)}
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
                  <FormSubmitButton>Add Member</FormSubmitButton>
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
