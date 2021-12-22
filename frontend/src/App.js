import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import UserAuthScreen from './screens/UserAuthScreen'
import GlobalStyle from './styles/GlobalStyle'
function App() {
  return (
    <Router>
      <GlobalStyle />
      <main>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/user/auth' element={<UserAuthScreen />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
