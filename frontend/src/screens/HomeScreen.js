import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import About from '../components/About'

const HomeScreen = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      
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
