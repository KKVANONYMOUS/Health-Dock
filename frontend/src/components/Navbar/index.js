import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from '../../icons/Logo.js'
import { UilMultiply, UilBars } from '@iconscout/react-unicons'
import {
  Nav,
  NavContainer,
  NavLink,
  NavList,
  NavListIcon,
  NavListItem,
  NavLogo,
} from './style.js'

const Navbar = () => {
  const location = useLocation()

  const [toggleNav, setToggleNav] = useState(false)
  const handleNavToggle = () => setToggleNav(!toggleNav)
  const handleCloseNav = () => setToggleNav(false)
  return (
    <Nav>
      <NavContainer>
        <NavLogo to='/' aria-label='Health Dock'>
          <Logo />
        </NavLogo>
        {location.pathname === '/' && (
          <>
            <NavListIcon onClick={handleNavToggle}>
              {toggleNav ? <UilMultiply size='32' /> : <UilBars size='32' />}
            </NavListIcon>

            <NavList onClick={handleNavToggle} toggleNav={toggleNav}>
              <NavListItem>
                <NavLink
                  onClick={handleCloseNav}
                  to='home'
                  smooth={true}
                  duration={1000}
                >
                  Home
                </NavLink>
              </NavListItem>
              <NavListItem>
                <NavLink
                  onClick={handleCloseNav}
                  to='about'
                  smooth={true}
                  duration={1000}
                >
                  About
                </NavLink>
              </NavListItem>
              <NavListItem>
                <NavLink
                  onClick={handleCloseNav}
                  to='contact'
                  smooth={true}
                  duration={1000}
                >
                  Contact
                </NavLink>
              </NavListItem>
            </NavList>
          </>
        )}
      </NavContainer>
    </Nav>
  )
}

export default Navbar
