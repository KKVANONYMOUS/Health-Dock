import styled from 'styled-components'
import { Link } from 'react-router-dom'
import HeroImg from '../images/HeroImage.png'

const Container = styled.section`
  position: relative;
  top: 10vh;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8fa;
  height: 90vh;
  width: 100%;
`
const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 50px;

  @media (max-width: 1000px) {
    height: 100%;
  }
`
const HeroContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 70%;
  width: 50%;
  padding-left: 80px;

  @media (max-width: 1000px) {
    height: 100%;
    width: 100%;
    padding-left: 30px;
  }
`

const HeroImage = styled.img`
  width: 50%;

  @media (max-width: 1000px) {
    display: none;
  }
`

const HeroTitle = styled.h1`
  font-family: 'Poppins';
  color: #2d2d3a;
  font-size: 3.5rem;
  margin-bottom: 0;

  @media (max-width: 1000px) {
    font-size: 2.5rem;
  }
`
const HeroSloganContainer = styled.div`
  width: 50%;
`

const HeroSlogan = styled.h3`
  font-family: 'Montserrat';
  font-weight: 500;
  color: #54586a;
  font-size: 1.5rem;
  margin: 0 0 45px 0;
`
const HeroInfoContainer = styled.div`
  width: 75%;
  margin-bottom: 20px;
`
const HeroInfo = styled.p`
  font-family: 'Poppins';
  color: #212121;
  font-weight: 500;
  font-size: 0.9rem;

  @media (max-width: 1000px) {
    font-size: 0.7rem;
  }
`

const HeroButtonContainer = styled.div`
  width: 75%;
`

const HeroButton = styled(Link)`
  text-decoration: none;
  font-family: 'Quicksand';
  font-weight: 700;
  font-size: 0.8rem;
  padding: 10px 50px;
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

  @media (max-width: 1000px) {
    padding: 5px 25px;
    font-size: 0.6rem;
  }
`

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
