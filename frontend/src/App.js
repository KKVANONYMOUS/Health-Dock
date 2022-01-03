import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EditPatientScreen from './screens/EditPatientScreen'
import HomeScreen from './screens/HomeScreen'
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
          <Route path='/user/auth' element={<UserAuthScreen />} />
          <Route path='/user/dashboard' element={<UserDashboardScreen />} />
          <Route
            path='/user/patient/:id/edit'
            element={<EditPatientScreen />}
          />
        </Routes>
      </main>
    </Router>
  )
}

export default App
