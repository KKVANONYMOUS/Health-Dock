import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import PatientAuthScreen from './screens/PatientAuthScreen'
function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/patient/auth" element={<PatientAuthScreen />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
