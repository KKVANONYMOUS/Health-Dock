import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  top: 70px;
  left: 0;
  width: 100%;
  padding: 20px 75px 20px;
  background-color: #f8f8fa;
  min-height: calc(100vh - 70px);

  @media (max-width: 767px) {
    padding-left: 15px;
    padding-right: 15px;
  }

  @media (width: 768px) and (height: 1024px) {
    height: 55vh;
    padding-left: 15px;
    padding-right: 15px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    justify-content: center;
    padding-left: 15px;
    padding-right: 15px;
  }
`

export const BackButton = styled(Link)`
  text-decoration: none;
  color: #496bf2;
  font-family: 'Poppins';
  margin-top: 50px;
  font-size: 12px;
  font-weight: 700;

  &:hover {
    color: #2dd6c1;
  }
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 0;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`

export const FirstColumn = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  padding: 10px;

  @media (max-width: 1000px) {
    width: 100%;
  }
`

export const SecondColumn = styled.div`
  width: 70%;
  padding: 10px;

  @media (max-width: 1000px) {
    width: 100%;
  }
`

export const FirstContainer = styled.div`
  background-color: #fff;
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

export const AvatarImage = styled.img`
  max-width: 200px;
  max-height: 140px;
  width: 45%;
  border-radius: 15px;
  margin-bottom: 15px;

  @media (max-width: 1000px) {
    width: auto;
    margin: 0 15px;
  }
`

export const ProfileName = styled.h3`
  color: #496bf2;
  font-family: 'Montserrat';
  font-weight: 800;
`

export const SecondContainer = styled.div`
  background-color: #fff;
  border-radius: 20px;
  text-align: left;
  padding: 20px;
  margin-bottom: 0;
`

export const ContainerHeading = styled.h4`
  color: #35484e;
  font-family: 'Poppins';
  font-weight: 800;
  margin-bottom: 10px;
`

export const InfoField = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const InfoFieldLabel = styled.h5`
  color: #35484e;
  font-family: 'Quicksand';
  font-weight: 800;
  width: 50%;
`

export const InfoFieldData = styled.p`
  color: #7c7f8c;
  font-family: 'Montserrat';
  font-weight: 500;
  width: 50%;
  font-size: 13px;
`

export const SecondColumnContainer = styled.div`
  background-color: #fff;
  border-radius: 20px;
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Heading = styled.h1`
  color: #496bf2;
  font-family: 'Poppins';
  font-weight: 800;
  margin-bottom: 10px;
`

export const RecordTableContainer = styled.div`
  width: 100%;
  max-height: 457px;
  height: 65vh;
  overflow-y: auto;
`

export const TableContainer = styled.div`
  max-width: 800px;
  width: 90%;
  margin: 0 auto 40px;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const TableHeadBox = styled.thead`
  background-color: transparent;

  @media (max-width: 767px) {
    display: none;
  }
`

export const TableRow = styled.tr`
  background-color: transparent;

  &:nth-child(even) {
    background-color: #f1f1f1;
  }

  @media (max-width: 767px) {
    display: block;
    margin-bottom: 20px;
  }
`

export const TableHeading = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 0.9rem;

  @media (max-width: 767px) {
    display: block;
    margin-bottom: 5px;
  }
`

export const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 0.75rem;

  @media (max-width: 767px) {
    display: block;
    position: relative;
    padding-left: 132px;
    text-align: left;
    border-bottom: 0;
    font-size: 0.7rem;

    &:last-child {
      border-bottom: 1px solid #ddd;
    }

    &:before {
      content: attr(data-heading);
      position: absolute;
      top: 0;
      left: 0;
      width: 120px;
      height: 100%;
      display: flex;
      align-items: center;
      background-color: #2dd6c1;
      color: #000;
      font-weight: 800;
      font-size: 0.75rem;
      padding: 0 5px;
      justify-content: center;
    }
  }
`

export const TableBody = styled.tbody``

export const Message = styled.div`
  width: 90%;
  color: #4b464b;
  padding: 20px 20px;
  border: 1px solid #4b464b;
  background-color: #e2e2e4;
  font-family: 'Montserrat';
  font-weight: 500;
  text-align: center;
`

export const ReportLink = styled.a`
  text-decoration: none;
  color: #496bf2;
  font-family: 'Quicksand';
  font-weight: 600;
`
