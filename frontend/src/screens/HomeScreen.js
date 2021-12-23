import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import About from '../components/About'
import styled from 'styled-components'
const Container = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  //background-color: cyan;
  height: 90vh;
  width: 100%;

  @media (max-width: 767px) {
    padding-top: 50px;
  }

  @media (width: 768px) and (height: 1024px) {
    //background-color: red;
    height: 55vh;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    justify-content: center;
  }
`
const HomeScreen = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      
      <About/>
    </div>
  )
}
const AboutScreen = () => {
  return (
    <div>
      <Navbar />
      <About />
    </div>
  )
}

export  {HomeScreen , AboutScreen}
