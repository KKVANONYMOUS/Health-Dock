import Logo from '../../icons/Logo'
import {
  Copyright,
  FooterContainer,
  FooterContent,
  LogoContainer,
} from './style'

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
