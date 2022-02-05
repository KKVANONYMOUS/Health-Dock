import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddPatientRecordScreen from './screens/AddPatientRecordScreen/'
import EditPatientRecordScreen from './screens/EditPatientRecordScreen/'
import EditPatientScreen from './screens/EditPatientScreen/'
import HomeScreen from './screens/HomeScreen/'
import HospitalDashboardScreen from './screens/HospitalDashboardScreen/'
import HospitalLoginScreen from './screens/HospitalLoginScreen/'
import HospitalRegisterScreen from './screens/HospitalRegisterScreen/'
import PatientDetailsScreen from './screens/PatientDetailsScreen/'
import UserAuthScreen from './screens/UserAuthScreen/'
import UserDashboardScreen from './screens/UserDashboardScreen/'
import ViewPatientRecordsScreen from './screens/ViewPatientRecordsScreen/'
import GlobalStyle from './styles/globalStyle'

function App() {
  return (
    <Router>
      <GlobalStyle />
      <main>
        <Routes>
          <Route path='/' element={<HomeScreen />} exact />
          <Route path='/user/auth' element={<UserAuthScreen />} exact />
          <Route
            path='/user/dashboard'
            element={<UserDashboardScreen />}
            exact
          />
          <Route
            path='/user/patient/:id/edit'
            element={<EditPatientScreen />}
            exact
          />
          <Route
            path='/user/patient/:id'
            element={<PatientDetailsScreen />}
            exact
          />
          <Route
            path='/hospital/login'
            element={<HospitalLoginScreen />}
            exact
          />
          <Route
            path='/hospital/register'
            element={<HospitalRegisterScreen />}
            exact
          />
          <Route
            path='/hospital/dashboard'
            element={<HospitalDashboardScreen />}
            exact
          />
          <Route
            path='/hospital/dashboard/:aadharNumber/new'
            element={<AddPatientRecordScreen />}
            exact
          />
          <Route
            path='/hospital/dashboard/:aadharNumber/'
            element={<ViewPatientRecordsScreen />}
            exact
          />
          <Route
            path='/hospital/dashboard/:aadharNumber/record/:recordId/edit'
            element={<EditPatientRecordScreen />}
            exact
          />
        </Routes>
      </main>
    </Router>
  )
}

export default App
