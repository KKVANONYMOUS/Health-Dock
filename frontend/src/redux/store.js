import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userSendOtpReducer, userVerifyOtpReducer } from './user/userReducers'
import {
  patientCreateReducer,
  patientListReducer,
  patientUpdateReducer,
} from './patient/patientReducers'

const reducer = combineReducers({
  userSendOtp: userSendOtpReducer,
  userLogin: userVerifyOtpReducer,
  patientList: patientListReducer,
  patientCreate: patientCreateReducer,
  patientUpdate: patientUpdateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = { userLogin: { userInfo: userInfoFromStorage } }

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
