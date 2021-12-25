import {
  USER_SEND_OTP_FAILURE,
  USER_SEND_OTP_REQUEST,
  USER_SEND_OTP_SUCCESS,
  USER_VERIFY_OTP_FAILURE,
  USER_VERIFY_OTP_REQUEST,
  USER_VERIFY_OTP_SUCCESS,
  USER_LOGOUT,
  USER_SEND_OTP_RESET,
} from './userTypes'

export const userSendOtpReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SEND_OTP_REQUEST:
      return {
        loading: true,
      }
    case USER_SEND_OTP_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case USER_SEND_OTP_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_SEND_OTP_RESET:
      return {}
    default:
      return state
  }
}

export const userVerifyOtpReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VERIFY_OTP_REQUEST:
      return {
        loading: true,
      }
    case USER_VERIFY_OTP_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }
    case USER_VERIFY_OTP_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}
