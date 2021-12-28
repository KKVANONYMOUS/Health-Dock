import {
  PATIENTS_LIST_FAILURE,
  PATIENTS_LIST_REQUEST,
  PATIENTS_LIST_SUCCESS,
  PATIENTS_LIST_RESET,
  PATIENT_CREATE_REQUEST,
  PATIENT_CREATE_SUCCESS,
  PATIENT_CREATE_RESET,
  PATIENT_CREATE_FAILURE,
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
      return { loading: false, success: true, product: action.payload }
    case PATIENT_CREATE_FAILURE:
      return { loading: false, error: action.payload }
    case PATIENT_CREATE_RESET:
      return {}
    default:
      return state
  }
}
