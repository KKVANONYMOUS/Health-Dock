import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const CardContainer = styled.div`
  width: 48%;
  border-radius: 30px;
  padding: 5px;
  margin: 10px 5px;
  display: flex;
  background-color: #fff;

  @media (max-width: 1000px) {
    flex-direction: column;
    margin: 10px 0;
    padding: 3px;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`

export const AvatarImage = styled.div`
  background-image: url(${({ background }) => background});
  border-radius: 15px 0 0 15px;
  background-size: cover;
  background-position: center;
  width: 30%;
  height: initial;

  @media (max-width: 1000px) {
    border-radius: 15px 15px 0 0;
    width: 100%;
    height: 200px;
  }
`

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  itmes-center: center;
  width: 70%;
  padding: 20px;

  @media (max-width: 1000px) {
    width: 100%;
  }
`

export const Name = styled.h3`
  font-family: 'Poppins';
  font-weight: 700;
`

export const CardField = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`

export const CardFieldLabel = styled.h5`
  font-family: 'Poppins';
  font-weight: 500;
  color: #54586a;
  margin-right: 3px;
`

export const CardFieldContent = styled.h5`
  font-family: 'Quicksand';
  font-weight: 400;
`

export const ButtonList = styled.div`
  display: flex;
  justify-contend: space-between;
  align-items: center;
`

export const Button = styled(Link)`
  text-decoration: none;
  font-family: 'Quicksand';
  font-weight: 700;
  font-size: 0.8rem;
  padding: 8px 20px;
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

  @media (max-width: 1024px) {
    padding: 5px 25px;
    font-size: 0.6rem;
  }
`
