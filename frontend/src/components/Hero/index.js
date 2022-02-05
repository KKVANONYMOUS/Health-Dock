import {
  Container,
  HeroContainer,
  HeroContentContainer,
  HeroTitle,
  HeroSloganContainer,
  HeroSlogan,
  HeroInfoContainer,
  HeroInfo,
  HeroButtonContainer,
  HeroButton,
  HeroImage,
} from './style'
import HeroImg from '../../images/HeroImage.png'

const Hero = () => {
  return (
    <Container id='home'>
      <HeroContainer>
        <HeroContentContainer>
          <HeroTitle>Health Dock.</HeroTitle>
          <HeroSloganContainer>
            <HeroSlogan>One stop solution for your health records</HeroSlogan>
          </HeroSloganContainer>
          <HeroInfoContainer>
            <HeroInfo>
              Our aim is to develop a solution for nationwide health information
              network that brings patient and hospitals to a single platform.
            </HeroInfo>
          </HeroInfoContainer>
          <HeroButtonContainer>
            <HeroButton color='#496BF2' to='/hospital/login'>
              Hospital
            </HeroButton>
            <HeroButton color='#2DD6C1' to='/user/auth'>
              User
            </HeroButton>
          </HeroButtonContainer>
        </HeroContentContainer>
        <HeroImage src={HeroImg} alt='Hero Image' />
      </HeroContainer>
    </Container>
  )
}

export default Hero
