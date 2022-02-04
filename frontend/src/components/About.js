import styled from 'styled-components'

const Container = styled.section`
  position: relative;
  top: 10vh;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  background-color: #fff;
`

const UpperContainer = styled.div`
  width: 100%;
  padding: 75px;

  @media (max-width: 1000px) {
    padding: 30px;
  }
`

const LowerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  width: 100%;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`

const AboutContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  padding-left: 75px;

  @media (max-width: 1000px) {
    height: 100%;
    width: 100%;
    padding-left: 30px;
  }
`

const UpperTitle = styled.h1`
  font-family: 'Poppins';
  color: #2d2d3a;
  font-size: 2.5rem;

  @media (max-width: 1000px) {
    font-size: 2rem;
  }
`

const LowerTitle = styled.h1`
  font-family: 'Poppins';
  color: #496bf2;
  font-size: 2rem;
  margin-bottom: 30px;

  @media (max-width: 1000px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
`

const AboutSlogan = styled.p`
  font-family: 'Montserrat';
  font-weight: 500;
  color: #54586a;
  font-size: 1.5rem;
  margin-top: 20px;

  @media (max-width: 1000px) {
    font-size: 1rem;
  }
`

const AboutInfoContainer = styled.div`
  width: 75%;
`

const Info = styled.p`
  font-family: 'Quicksand';
  color: #212121;
  font-weight: 600;
  font-size: 1.2rem;

  @media (max-width: 1000px) {
    font-size: 0.7rem;
  }
`

const List = styled.ul`
  margin-left: 20px;
`

const ListItem = styled.li``
const UnderLine = styled.u`
  text-decoration-line: underline;
  box-sizing: border-box;
  text-decoration-color: #2dd6c1;
  text-underline-offset: 0.2em;
  text-decoration-thickness: 5px;
`

const AboutContainer = styled.div``

const About = () => {
  return (
    <Container id='about'>
      <AboutContainer>
        <UpperContainer>
          <UpperTitle>Who are we?</UpperTitle>
          <AboutSlogan>
            We provide digital record of health information such as medical
            history, diagnoses, medications, immunization dates, and allergies.
            Making the health information available, reducing duplication of
            tests, reducing delays in treatment, and patients well informed to
            take better decisions.
          </AboutSlogan>
        </UpperContainer>
        <LowerContainer>
          <AboutContentContainer>
            <LowerTitle>
              <UnderLine>Our Vision</UnderLine>
            </LowerTitle>
            <AboutInfoContainer>
              <Info>
                Our vision is to enhance Nation's Health IT Infrastructure and
                strengthen the relationship between patients and clinicians.
              </Info>
            </AboutInfoContainer>
          </AboutContentContainer>
          <AboutContentContainer>
            <LowerTitle>
              <UnderLine>Key Features</UnderLine>
            </LowerTitle>
            <AboutInfoContainer>
              <List>
                <ListItem>
                  <Info>Easy sign up / sign in</Info>
                </ListItem>
                <ListItem>
                  <Info>Digitally secure Health Record</Info>
                </ListItem>
                <ListItem>
                  <Info>Efficiently manage your family's health data</Info>
                </ListItem>
              </List>
            </AboutInfoContainer>
          </AboutContentContainer>
        </LowerContainer>
      </AboutContainer>
    </Container>
  )
}

export default About
