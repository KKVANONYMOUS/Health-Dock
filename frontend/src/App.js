import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import {HomeScreen , AboutScreen} from './screens/HomeScreen'
import UserAuthScreen from './screens/UserAuthScreen'
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
        </Routes>
      </main>
    </Router>
  )
}

export default App
