import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userSendOtpReducer, userVerifyOtpReducer } from './user/userReducers'
import {
  patientCreateReducer,
  patientDetailsReducer,
  patientListReducer,
  patientUpdateReducer,
} from './patient/patientReducers'
import {
  hospitalLoginReducer,
  hospitalRegisterReducer,
  hospitalPatientDetailsReducer,
  hospitalAddPatientRecordReducer,
  hospitalDeletePatientRecordReducer,
  hospitalViewPatientRecordReducer,
  hospitalUpdatePatientRecordReducer,
  aadharNumberListReducer,
} from './hospital/hospitalReducers'

const reducer = combineReducers({
  userSendOtp: userSendOtpReducer,
  userLogin: userVerifyOtpReducer,
  patientList: patientListReducer,
  patientCreate: patientCreateReducer,
  patientDetails: patientDetailsReducer,
  patientUpdate: patientUpdateReducer,
  hospitalLogin: hospitalLoginReducer,
  hospitalRegister: hospitalRegisterReducer,
  hospitalPatientDetails: hospitalPatientDetailsReducer,
  hospitalAddPatientRecord: hospitalAddPatientRecordReducer,
  hospitalViewPatientRecord: hospitalViewPatientRecordReducer,
  hospitalDeletePatientRecord: hospitalDeletePatientRecordReducer,
  hospitalUpdatePatientRecord: hospitalUpdatePatientRecordReducer,
  aadharNumberList: aadharNumberListReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const hospitalInfoFromStorage = localStorage.getItem('hospitalInfo')
  ? JSON.parse(localStorage.getItem('hospitalInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  hospitalLogin: { hospitalInfo: hospitalInfoFromStorage },
}

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
