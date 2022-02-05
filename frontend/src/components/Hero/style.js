import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.section`
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

export const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 50px;

  @media (max-width: 1000px) {
    height: 100%;
  }
`

export const HeroContentContainer = styled.div`
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

export const HeroImage = styled.img`
  width: 50%;

  @media (max-width: 1000px) {
    display: none;
  }
`

export const HeroTitle = styled.h1`
  font-family: 'Poppins';
  color: #2d2d3a;
  font-size: 3.5rem;
  margin-bottom: 0;

  @media (max-width: 1000px) {
    font-size: 2.5rem;
  }
`

export const HeroSloganContainer = styled.div`
  width: 50%;
`

export const HeroSlogan = styled.h3`
  font-family: 'Montserrat';
  font-weight: 500;
  color: #54586a;
  font-size: 1.5rem;
  margin: 0 0 45px 0;
`

export const HeroInfoContainer = styled.div`
  width: 75%;
  margin-bottom: 20px;
`

export const HeroInfo = styled.p`
  font-family: 'Poppins';
  color: #212121;
  font-weight: 500;
  font-size: 0.9rem;

  @media (max-width: 1000px) {
    font-size: 0.7rem;
  }
`

export const HeroButtonContainer = styled.div`
  width: 75%;
`

export const HeroButton = styled(Link)`
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
