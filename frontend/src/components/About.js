import styled from 'styled-components'

const UpperContainer = styled.div`
  ${'' /* display: flex; */}
  justify-content: space-between;
  align-items: center;
  height: 50%;
  width: 100%;
  padding: 0 75px 0px;

  @media (max-width: 1000px) {
    padding: 0;
    height: 65%;
  }
`

const Container = styled.section`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 90vh;
  width: 100%;
  background-color: #fff;

  @media (max-width: 767px) {
    padding-left: 15px;
    padding-right: 15px;
  }

  @media (width: 768px) and (height: 1024px) {
    //background-color: red;
    height: 55vh;
    padding-left: 15px;
    padding-right: 15px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    justify-content: center;
    padding-left: 15px;
    padding-right: 15px;
  }
`

const AboutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  height: 70%;
  width: 100%;
  @media (max-width: 1000px) {
    //align-items: start;
  }
`

const AboutContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 80%;
  width: 50%;
  padding-left: 80px;

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
  margin-top: 50px;
  margin-bottom: 20px;

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
  }
`

const AboutSlogan = styled.p`
  font-family: 'Montserrat';
  font-weight: 500;
  color: #54586a;
  font-size: 1.5rem;
  margin: 20px 0 45px 0;

  @media (max-width: 1000px) {
    font-size: 1rem;
  }
`

const AboutInfoContainer = styled.div`
  width: 75%;
  margin-bottom: 20px;
`

const Info = styled.p`
  font-family: 'Poppins';
  color: #212121;
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 10px;
  @media (max-width: 1000px) {
    font-size: 0.7rem;
  }
`

const List = styled.ul`
  align-items: center;
  justify-content: center;
  height: 15vh;
`

const ListItem = styled.li`
  height: 34px;
  padding-bottom: 20px;
  @media (max-width: 1000px) {
    height: 50px;
    padding-bottom: 25px;
  }
`
const UnderLine = styled.u`
  text-decoration-line: underline;
  box-sizing: border-box;
  text-decoration-color: #2dd6c1;
  text-underline-offset: 0.2em;
  text-decoration-thickness: 5px;
`

const About = () => {
  return (
    <Container id='about'>
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
      <AboutContainer>
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
      </AboutContainer>
    </Container>
  )
}

export default About
