import {
  AboutContainer,
  AboutContentContainer,
  AboutInfoContainer,
  AboutSlogan,
  Container,
  Info,
  List,
  ListItem,
  LowerContainer,
  LowerTitle,
  UnderLine,
  UpperContainer,
  UpperTitle,
} from './style'

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
