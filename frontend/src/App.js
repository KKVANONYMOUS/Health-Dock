import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { HomeScreen, AboutScreen } from './screens/HomeScreen'
import UserAuthScreen from './screens/UserAuthScreen'
import UserDashboardScreen from './screens/UserDashboardScreen'
import GlobalStyle from './styles/globalStyle'

function App() {
  return (
    <Router>
      <GlobalStyle />
      <main>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/about' element={<AboutScreen />} />
          <Route path='/user/auth' element={<UserAuthScreen />} />
          <Route path='/user/dashboard' element={<UserDashboardScreen />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
