import styled from 'styled-components'

export const Container = styled.section`
  position: relative;
  top: 10vh;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  background-color: #fff;
`

export const UpperContainer = styled.div`
  width: 100%;
  padding: 75px;

  @media (max-width: 1000px) {
    padding: 30px;
  }
`

export const LowerContainer = styled.div`
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

export const AboutContentContainer = styled.div`
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

export const UpperTitle = styled.h1`
  font-family: 'Poppins';
  color: #2d2d3a;
  font-size: 2.5rem;

  @media (max-width: 1000px) {
    font-size: 2rem;
  }
`

export const LowerTitle = styled.h1`
  font-family: 'Poppins';
  color: #496bf2;
  font-size: 2rem;
  margin-bottom: 30px;

  @media (max-width: 1000px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
`

export const AboutSlogan = styled.p`
  font-family: 'Montserrat';
  font-weight: 500;
  color: #54586a;
  font-size: 1.5rem;
  margin-top: 20px;

  @media (max-width: 1000px) {
    font-size: 1rem;
  }
`

export const AboutInfoContainer = styled.div`
  width: 75%;
`

export const Info = styled.p`
  font-family: 'Quicksand';
  color: #212121;
  font-weight: 600;
  font-size: 1.2rem;

  @media (max-width: 1000px) {
    font-size: 0.7rem;
  }
`

export const List = styled.ul`
  margin-left: 20px;
`

export const ListItem = styled.li``
export const UnderLine = styled.u`
  text-decoration-line: underline;
  box-sizing: border-box;
  text-decoration-color: #2dd6c1;
  text-underline-offset: 0.2em;
  text-decoration-thickness: 5px;
`

export const AboutContainer = styled.div``
