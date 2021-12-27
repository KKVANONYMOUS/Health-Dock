import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Logo from '../icons/Logo.js'
import { UilMultiply, UilBars } from '@iconscout/react-unicons'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 10vh;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`
const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  width: 100%;
  //background-color: red;
  padding: 0 50px;

  @media (max-width: 1000px) {
    padding: 0;
  }
`

const NavLogo = styled(Link)`
  text-decoration: none;
  outline: none;
  //background-color: orange;
  width: 220px;
  //height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const NavListIcon = styled.div`
  display: none;

  @media (max-width: 1000px) {
    display: block;
    position: relative;
    top: 0;
    right: 0;
    transform: translate(-20%, 0%);
    //font-size: 2rem;
    cursor: pointer;
    //background-color: yellow;
  }
`
const NavList = styled.ul`
  display: flex;
  align-items: center;
  //justify-content: center;
  //background-color: green;
  height: 10vh;
  padding: 0 20px;

  @media (max-width: 1000px) {
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: absolute;
    padding: 0;
    top: 65px;
    left: ${({ toggleNav }) => (toggleNav ? '0' : '-150%')};
    background-color: rgba(0, 0, 0, 0.9);
    transition: 0.5s ease-in-out;
  }
`

const NavListItem = styled.li`
  list-style: none;
  height: 64px;
  //background-color: cyan;
  //margin-right: 2rem;

  @media (max-width: 1000px) {
    //background-color: pink;
    width: 100%;
    height: 10vh;
    margin-bottom: 2px;
    &:hover {
      border: none;
    }
  }
`
const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  outline: none;
  //justify-content: space-between;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins';
  font-weight: 700;
  font-size: 1.2rem;
  color: #000;
  padding: 1rem 2rem;
  //height: 32px;
  //background-color: grey;

  @media (max-width: 1000px) {
    //height: 100px;
    //display: block;
    //align-items: center;
    //text-align: center;
    color: #ccc;
    padding: 1.5rem;
  }
`
const Navbar = () => {
  const [toggleNav, setToggleNav] = useState(false)
  const handleNavToggle = () => setToggleNav(!toggleNav)
  const handleCloseNav = () => setToggleNav(false)
  return (
    <Nav>
      <NavContainer>
        <NavLogo to='/'>
          <Logo />
        </NavLogo>
        <NavListIcon onClick={handleNavToggle}>
          {toggleNav ? <UilMultiply size='32' /> : <UilBars size='32' />}
        </NavListIcon>

        <NavList onClick={handleNavToggle} toggleNav={toggleNav}>
          <NavListItem>
            <NavLink onClick={handleCloseNav} to='/'>
              Home
            </NavLink>
          </NavListItem>
          <NavListItem>
            <NavLink onClick={handleCloseNav} to='/about'>
              About
            </NavLink>
          </NavListItem>
          <NavListItem>
            <NavLink onClick={handleCloseNav} to='/contact'>
              Contact
            </NavLink>
          </NavListItem>
        </NavList>
      </NavContainer>
    </Nav>
  )
}

export default Navbar
