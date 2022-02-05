import { useEffect, useState } from 'react'
import {
  AvatarImage,
  Button,
  ButtonList,
  CardContainer,
  CardField,
  CardFieldContent,
  CardFieldLabel,
  CardInfo,
  Name,
} from './style'

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
      setAvatarImageUrl(
        `https://res.cloudinary.com/healthdockcloud/image/upload/v1643823830/identicon-${
          (Number(aadharNum[11]) % 5) + 1
        }.png`
      )
    }
  }, [aadharNum, image])
  return (
    <CardContainer>
      <AvatarImage background={avatarImageUrl} />
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
