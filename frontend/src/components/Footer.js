import styled from 'styled-components'
import Logo from '../icons/Logo.js'

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dfdfe1;
  padding: 20px 0;
`

const FooterContent = styled.div``

const Copyright = styled.p`
  font-family: 'Quicksand';
  font-weight: 600;
  color: #313132;
  font-size: 0.8rem;
`

const LogoContainer = styled.div`
  width: 220px;
`
const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <Copyright>©2022 Health Dock. All rights reserved.</Copyright>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer
