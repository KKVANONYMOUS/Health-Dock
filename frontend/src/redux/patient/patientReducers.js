import {
  PATIENTS_LIST_FAILURE,
  PATIENTS_LIST_REQUEST,
  PATIENTS_LIST_SUCCESS,
  PATIENTS_LIST_RESET,
  PATIENT_CREATE_REQUEST,
  PATIENT_CREATE_SUCCESS,
  PATIENT_CREATE_RESET,
  PATIENT_CREATE_FAILURE,
  PATIENT_UPDATE_REQUEST,
  PATIENT_UPDATE_SUCCESS,
  PATIENT_UPDATE_FAILURE,
  PATIENT_UPDATE_RESET,
  PATIENT_DETAILS_REQUEST,
  PATIENT_DETAILS_SUCCESS,
  PATIENT_DETAILS_FAILURE,
  PATIENT_DETAILS_RESET,
} from './patientTypes'

export const patientListReducer = (state = { patients: [] }, action) => {
  switch (action.type) {
    case PATIENTS_LIST_REQUEST:
      return { loading: true, patients: [] }
    case PATIENTS_LIST_SUCCESS:
      return {
        loading: false,
        patients: action.payload.patientDetails,
      }
    case PATIENTS_LIST_FAILURE:
      return { loading: false, error: action.payload }
    case PATIENTS_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const patientCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_CREATE_REQUEST:
      return { loading: true }
    case PATIENT_CREATE_SUCCESS:
      return { loading: false, success: true, patient: action.payload }
    case PATIENT_CREATE_FAILURE:
      return { loading: false, error: action.payload }
    case PATIENT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const patientDetailsReducer = (state = { patient: {} }, action) => {
  switch (action.type) {
    case PATIENT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PATIENT_DETAILS_SUCCESS:
      return { loading: false, patient: action.payload }
    case PATIENT_DETAILS_FAILURE:
      return { loading: false, error: action.payload }
    case PATIENT_DETAILS_RESET:
      return { patient: {} }
    default:
      return state
  }
}

export const patientUpdateReducer = (state = { patient: {} }, action) => {
  switch (action.type) {
    case PATIENT_UPDATE_REQUEST:
      return { loading: true }
    case PATIENT_UPDATE_SUCCESS:
      return { loading: false, success: true, patient: action.payload }
    case PATIENT_UPDATE_FAILURE:
      return { loading: false, error: action.payload }
    case PATIENT_UPDATE_RESET:
      return { patient: {} }
    default:
      return state
  }
}
