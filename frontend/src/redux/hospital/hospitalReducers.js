import {
  HOSPITAL_ADD_PATIENT_RECORD_FAILURE,
  HOSPITAL_ADD_PATIENT_RECORD_REQUEST,
  HOSPITAL_ADD_PATIENT_RECORD_RESET,
  HOSPITAL_ADD_PATIENT_RECORD_SUCCESS,
  HOSPITAL_DELETE_PATIENT_RECORD_FAILURE,
  HOSPITAL_DELETE_PATIENT_RECORD_REQUEST,
  HOSPITAL_DELETE_PATIENT_RECORD_SUCCESS,
  HOSPITAL_UPDATE_PATIENT_RECORD_FAILURE,
  HOSPITAL_UPDATE_PATIENT_RECORD_REQUEST,
  HOSPITAL_UPDATE_PATIENT_RECORD_RESET,
  HOSPITAL_UPDATE_PATIENT_RECORD_SUCCESS,
  HOSPITAL_LOGIN_FAILURE,
  HOSPITAL_LOGIN_REQUEST,
  HOSPITAL_LOGIN_SUCCESS,
  HOSPITAL_LOGOUT,
  HOSPITAL_PATIENT_DETAILS_FAILURE,
  HOSPITAL_PATIENT_DETAILS_REQUEST,
  HOSPITAL_PATIENT_DETAILS_SUCCESS,
  HOSPITAL_REGISTER_FAILURE,
  HOSPITAL_REGISTER_REQUEST,
  HOSPITAL_REGISTER_SUCCESS,
  HOSPITAL_VIEW_PATIENT_RECORD_FAILURE,
  HOSPITAL_VIEW_PATIENT_RECORD_REQUEST,
  HOSPITAL_VIEW_PATIENT_RECORD_SUCCESS,
  FETCH_AADHAR_NUMBER_LIST_REQUEST,
  FETCH_AADHAR_NUMBER_LIST_SUCCESS,
  FETCH_AADHAR_NUMBER_LIST_FAILURE,
} from './hospitalTypes'

export const hospitalLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case HOSPITAL_LOGIN_REQUEST:
      return { loading: true }
    case HOSPITAL_LOGIN_SUCCESS:
      return { loading: false, hospitalInfo: action.payload }
    case HOSPITAL_LOGIN_FAILURE:
      return { loading: false, error: action.payload }
    case HOSPITAL_LOGOUT:
      return {}
    default:
      return state
  }
}

export const hospitalRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case HOSPITAL_REGISTER_REQUEST:
      return { loading: true }
    case HOSPITAL_REGISTER_SUCCESS:
      return { loading: false, hospitalInfo: action.payload }
    case HOSPITAL_REGISTER_FAILURE:
      return { loading: false, error: action.payload }
    case HOSPITAL_LOGOUT:
      return {}
    default:
      return state
  }
}

export const hospitalPatientDetailsReducer = (
  state = { patient: {} },
  action
) => {
  switch (action.type) {
    case HOSPITAL_PATIENT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case HOSPITAL_PATIENT_DETAILS_SUCCESS:
      return { loading: false, success: true, patient: action.payload }
    case HOSPITAL_PATIENT_DETAILS_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const hospitalAddPatientRecordReducer = (
  state = { patient: {} },
  action
) => {
  switch (action.type) {
    case HOSPITAL_ADD_PATIENT_RECORD_REQUEST:
      return { loading: true }
    case HOSPITAL_ADD_PATIENT_RECORD_SUCCESS:
      return { loading: false, success: true, patient: action.payload }
    case HOSPITAL_ADD_PATIENT_RECORD_FAILURE:
      return { loading: false, error: action.payload }
    case HOSPITAL_ADD_PATIENT_RECORD_RESET:
      return { patient: {} }
    default:
      return state
  }
}

export const hospitalViewPatientRecordReducer = (
  state = { record: {} },
  action
) => {
  switch (action.type) {
    case HOSPITAL_VIEW_PATIENT_RECORD_REQUEST:
      return { ...state, loading: true }
    case HOSPITAL_VIEW_PATIENT_RECORD_SUCCESS:
      return { loading: false, record: action.payload }
    case HOSPITAL_VIEW_PATIENT_RECORD_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const hospitalUpdatePatientRecordReducer = (
  state = { record: {} },
  action
) => {
  switch (action.type) {
    case HOSPITAL_UPDATE_PATIENT_RECORD_REQUEST:
      return { loading: true }
    case HOSPITAL_UPDATE_PATIENT_RECORD_SUCCESS:
      return { loading: false, success: true, record: action.payload }
    case HOSPITAL_UPDATE_PATIENT_RECORD_FAILURE:
      return { loading: false, error: action.payload }
    case HOSPITAL_UPDATE_PATIENT_RECORD_RESET:
      return { record: {} }
    default:
      return state
  }
}

export const hospitalDeletePatientRecordReducer = (state = {}, action) => {
  switch (action.type) {
    case HOSPITAL_DELETE_PATIENT_RECORD_REQUEST:
      return { loading: true }
    case HOSPITAL_DELETE_PATIENT_RECORD_SUCCESS:
      return { loading: false, success: true }
    case HOSPITAL_DELETE_PATIENT_RECORD_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const aadharNumberListReducer = (
  state = { aadharNumbers: {} },
  action
) => {
  switch (action.type) {
    case FETCH_AADHAR_NUMBER_LIST_REQUEST:
      return { loading: true }
    case FETCH_AADHAR_NUMBER_LIST_SUCCESS:
      return { loading: false, aadharNumbers: action.payload }
    case FETCH_AADHAR_NUMBER_LIST_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
