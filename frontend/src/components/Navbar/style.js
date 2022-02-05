import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

export const Nav = styled.nav`
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

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  width: 100%;
  padding: 0 50px;

  @media (max-width: 1000px) {
    padding: 0;
  }
`

export const NavLogo = styled(Link)`
  text-decoration: none;
  outline: none;
  width: 220px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const NavListIcon = styled.div`
  display: none;

  @media (max-width: 1000px) {
    display: block;
    position: relative;
    top: 0;
    right: 0;
    transform: translate(-20%, 0%);
    cursor: pointer;
  }
`

export const NavList = styled.ul`
  display: flex;
  align-items: center;
  height: 10vh;
  padding: 0 20px;

  @media (max-width: 1000px) {
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 10vh;
    left: ${({ toggleNav }) => (toggleNav ? '0' : '-150%')};
    padding: 0;
    background-color: rgba(0, 0, 0, 0.9);
    transition: 0.5s ease-in-out;
  }
`

export const NavListItem = styled.li`
  list-style: none;
  height: 64px;
  margin-right: 0.5rem;

  @media (max-width: 1000px) {
    width: 100%;
    height: 10vh;
    margin-bottom: 2px;
    &:hover {
      border: none;
    }
  }
`

export const NavLink = styled(ScrollLink)`
  display: flex;
  flex-direction: column;
  outline: none;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins';
  font-weight: 700;
  font-size: 1.2rem;
  color: #000;
  padding: 1rem 2rem;
  cursor: pointer;

  @media (max-width: 1000px) {
    color: #ccc;
    padding: 1.5rem;
  }
`
