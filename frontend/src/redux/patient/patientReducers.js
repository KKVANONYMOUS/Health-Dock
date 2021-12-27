import {
  PATIENTS_LIST_FAILURE,
  PATIENTS_LIST_REQUEST,
  PATIENTS_LIST_SUCCESS,
  PATIENTS_LIST_RESET,
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
