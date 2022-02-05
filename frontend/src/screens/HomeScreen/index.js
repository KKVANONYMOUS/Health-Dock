import Hero from '../../components/Hero/'
import Navbar from '../../components/Navbar/'
import About from '../../components/About/'
import Contact from '../../components/Contact/'
import Footer from '../../components/Footer/'

const HomeScreen = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default HomeScreen
