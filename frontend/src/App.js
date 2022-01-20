import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddPatientRecordScreen from './screens/AddPatientRecordScreen'
import EditPatientScreen from './screens/EditPatientScreen'
import HomeScreen from './screens/HomeScreen'
import HospitalDashboardScreen from './screens/HospitalDashboardScreen'
import HospitalLoginScreen from './screens/HospitalLoginScreen'
import HospitalRegisterScreen from './screens/HospitalRegisterScreen'
import PatientDetailsScreen from './screens/PatientDetailsScreen'
import UserAuthScreen from './screens/UserAuthScreen'
import UserDashboardScreen from './screens/UserDashboardScreen'
import GlobalStyle from './styles/globalStyle'

function App() {
  return (
    <Router>
      <GlobalStyle />
      <main>
        <Routes>
          <Route exact path='/' element={<HomeScreen />} />
          <Route path='/user/auth' element={<UserAuthScreen />} />
          <Route path='/user/dashboard' element={<UserDashboardScreen />} />
          <Route
            path='/user/patient/:id/edit'
            element={<EditPatientScreen />}
          />
          <Route path='/user/patient/:id' element={<PatientDetailsScreen />} />
          <Route path='/hospital/login' element={<HospitalLoginScreen />} />
          <Route
            path='/hospital/register'
            element={<HospitalRegisterScreen />}
          />
          <Route
            exact
            path='/hospital/dashboard'
            element={<HospitalDashboardScreen />}
          />
          <Route
            path='/hospital/dashboard/:aadharNumber/new'
            element={<AddPatientRecordScreen />}
          />
        </Routes>
      </main>
    </Router>
  )
}

export default App
