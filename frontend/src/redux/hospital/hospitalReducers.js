import {
  HOSPITAL_LOGIN_FAILURE,
  HOSPITAL_LOGIN_REQUEST,
  HOSPITAL_LOGIN_SUCCESS,
  HOSPITAL_LOGOUT,
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
