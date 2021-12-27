import axios from 'axios'
import { resetPatientsList } from '../patient/patientActions'

import {
  USER_VERIFY_OTP_FAILURE,
  USER_VERIFY_OTP_REQUEST,
  USER_VERIFY_OTP_SUCCESS,
  USER_LOGOUT,
  USER_SEND_OTP_REQUEST,
  USER_SEND_OTP_SUCCESS,
  USER_SEND_OTP_FAILURE,
  USER_SEND_OTP_RESET,
} from './userTypes'

const userSendOtpRequest = () => {
  return {
    type: USER_SEND_OTP_REQUEST,
  }
}
const userSendOtpSuccess = (data) => {
  return {
    type: USER_SEND_OTP_SUCCESS,
    payload: data,
  }
}

const userSendOtpFailure = (error) => {
  return {
    type: USER_SEND_OTP_FAILURE,
    payload: error,
  }
}

export const userSendOtpReset = () => {
  return {
    type: USER_SEND_OTP_RESET,
  }
}

const userVerifyOtpRequest = () => {
  return {
    type: USER_VERIFY_OTP_REQUEST,
  }
}
const userVerifyOtpSuccess = (user) => {
  return {
    type: USER_VERIFY_OTP_SUCCESS,
    payload: user,
  }
}

const userVerifyOtpFailure = (error) => {
  return {
    type: USER_VERIFY_OTP_FAILURE,
    payload: error,
  }
}

const userLogout = () => {
  return {
    type: USER_LOGOUT,
  }
}

export const sendOtp = (phoneNumber) => async (dispatch) => {
  try {
    dispatch(userSendOtpRequest())
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post('/api/auth/user', { phoneNumber }, config)

    dispatch(userSendOtpSuccess(data))
  } catch (err) {
    const errMsg =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    dispatch(userSendOtpFailure(errMsg))
  }
}

export const verifyOtp = (userId, otp) => async (dispatch) => {
  try {
    dispatch(userVerifyOtpRequest())
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      '/api/auth/user/verify_otp',
      { userId, otp },
      config
    )

    dispatch(userVerifyOtpSuccess(data))

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (err) {
    const errMsg =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    dispatch(userVerifyOtpFailure(errMsg))
  }
}

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch(userLogout())
  dispatch(resetPatientsList())
  document.location.href = '/user/auth'
}
