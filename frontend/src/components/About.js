import styled from 'styled-components'


const UpperContainer = styled.div`
  ${'' /* display: flex; */}
  justify-content: space-between; 
  align-items: center;
  height: 40%;
  width: 100%;
  ${'' /* background-color: red; */}
  padding: 0 75px 0px;
  
  @media (max-width: 1000px) {
    padding: 0;
    height : 65%;
  }
`
const Container = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  display: flex;
  flex-direction: column;
  ${'' /* align-items: center; */}
  justify-content: start;
  ${'' /* background-color: cyan; */}
  height: 90vh;
  width: 100%;

  @media (max-width: 767px) {
    padding-top: 50px;
  }

  @media (width: 768px) and (height: 1024px) {
    //background-color: red;
    height: 55vh;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    justify-content: center;
  }
`
const AboutContainer = styled.div`
  display: flex;
  ${'' /* position: relative; */}
  align-items: center;
  justify-content: center;
  ${'' /* background-color: grey; */}
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
  ${'' /* align-items: flex-start; */}
  justify-content: center;
  ${'' /* background-color: yellow; */}
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
  //background-color: pink;

  @media (max-width: 1000px) {
    font-size: 2rem;
  }
`
const LowerTitle = styled.h1`
  font-family: 'Poppins';
  color: #496BF2;
  font-size: 2rem;
  margin-bottom: 30px;
  //background-color: pink;

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
  ${'' /* background-color: green; */}
  height: 15vh;
  ${'' /* padding: 0 20px; */}

  
`

const ListItem = styled.li`
  ${'' /* list-style: none; */}
  height: 34px;
  
  //background-color: cyan;
  //margin-right: 2rem;

  
` 
const UnderLine = styled.u`
  text-decoration-line: underline;
  box-sizing: border-box;
  text-decoration-color: #2DD6C1;
  text-underline-offset: 0.4em;
  text-decoration-thickness: 5px;
  
`        

const About = () => {
  return (
    
    <Container>
      <UpperContainer>
        <UpperTitle>Who are we?</UpperTitle>
        <AboutSlogan>We provide digital record of health information such as medical history, diagnoses, medications, immunization dates, and allergies.
        Making the health information available, reducing duplication of tests, reducing delays in treatment, and patients well informed to take better decisions.</AboutSlogan>
      </UpperContainer>
      <AboutContainer>
        <AboutContentContainer>
          <LowerTitle><UnderLine>Our Vision</UnderLine></LowerTitle>
          <AboutInfoContainer>
            <Info>
            Our vision is to enhance Nation's Health IT Infrastructure and strengthen the relationship between patients and clinicians.
            </Info>
          </AboutInfoContainer>
        </AboutContentContainer>
        <AboutContentContainer>
          <LowerTitle><UnderLine>Key Features</UnderLine></LowerTitle>
          <AboutInfoContainer>
            <List>
              <ListItem>
                  <Info>
                  Easy sign up / sign 
                  </Info>
              </ListItem>
              <ListItem>
                  <Info>
                  Digitally secure Health Record  
                  </Info>
              </ListItem>
              <ListItem>
                  <Info>
                  Creating safer and efficient health records for you and your family  
                  </Info>
              </ListItem>
            </List>
          </AboutInfoContainer>
        </AboutContentContainer>
      </AboutContainer>
    </Container>
  )
}

export default About
