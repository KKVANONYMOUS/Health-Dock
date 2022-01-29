import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CardContainer = styled.div`
  width: 48%;
  border-radius: 30px;
  padding: 5px;
  margin: 10px 5px;
  display: flex;
  background-color: #fff;

  @media (max-width: 1000px) {
    flex-direction: column;
    margin: 10px 0;
    padding: 3px;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`

const AvatarImage = styled.img`
  width: 45%;
  border-radius: 30px 0 0 30px;

  @media (max-width: 1000px) {
    width: auto;
    margin: 0 20px;
    border-radius: 30px;
  }
`

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  itmes-center: center;
  width: 70%;
  //  background-color: yellow;
  padding: 20px;

  @media (max-width: 1000px) {
    width: 100%;
  }
`

const Name = styled.h3`
  font-family: 'Poppins';
  font-weight: 700;
`

const CardField = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`

const CardFieldLabel = styled.h5`
  font-family: 'Poppins';
  font-weight: 500;
  color: #54586a;
  margin-right: 3px;
`

const CardFieldContent = styled.h5`
  font-family: 'Quicksand';
  font-weight: 400;
`

const ButtonList = styled.div`
  display: flex;
  justify-contend: space-between;
  align-items: center;
`

const Button = styled(Link)`
  text-decoration: none;
  font-family: 'Quicksand';
  font-weight: 700;
  font-size: 0.8rem;
  padding: 8px 20px;
  border: 2px;
  border-style: solid;
  border-color: ${({ color }) => color};
  outline: none;
  color: #fff;
  margin-right: 2rem;
  background-color: ${({ color }) => color};
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #fff;
    color: ${({ color }) => color};
  }

  @media (max-width: 1024px) {
    padding: 5px 25px;
    font-size: 0.6rem;
  }
`

const MemberCard = ({
  fullName,
  aadharNum,
  dob,
  age,
  gender,
  bloodGroup,
  patientId,
  image,
}) => {
  const [avatarImageUrl, setAvatarImageUrl] = useState('')
  const formatDob = new Date(dob)
  useEffect(() => {
    if (image) setAvatarImageUrl(image)
    else {
      if (fullName) {
        setAvatarImageUrl(
          `https://ui-avatars.com/api/?name=${fullName}&background=eee&color=007bff&bold=true&format=svg`
        )
      }
    }
  }, [fullName, image])
  return (
    <CardContainer>
      <AvatarImage src={avatarImageUrl} alt='Avatar Image' />
      <CardInfo>
        <Name>{fullName}</Name>
        <CardField>
          <CardFieldLabel>Aadhar Number:</CardFieldLabel>
          <CardFieldContent>
            XXXX-XXXX-X{aadharNum && aadharNum.substring(9)}
          </CardFieldContent>
        </CardField>
        <CardField>
          <CardFieldLabel>DOB:</CardFieldLabel>
          <CardFieldContent>
            {formatDob.toLocaleDateString('en-UK')}
          </CardFieldContent>
        </CardField>
        <CardField>
          <CardFieldLabel>Gender:</CardFieldLabel>
          <CardFieldContent>{gender}</CardFieldContent>
        </CardField>
        <CardField>
          <CardFieldLabel>Age:</CardFieldLabel>
          <CardFieldContent>{age}</CardFieldContent>
        </CardField>
        <CardField>
          <CardFieldLabel>Blood Group:</CardFieldLabel>
          <CardFieldContent>{bloodGroup}</CardFieldContent>
        </CardField>
        <ButtonList>
          <Button color='#496BF2' to={`/user/patient/${patientId}/edit`}>
            Edit Profile
          </Button>
          <Button color='#2DD6C1' to={`/user/patient/${patientId}`}>
            View Profile
          </Button>
        </ButtonList>
      </CardInfo>
    </CardContainer>
  )
}

export default MemberCard
