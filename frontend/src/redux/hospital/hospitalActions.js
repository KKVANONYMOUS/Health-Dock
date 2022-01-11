import axios from 'axios'
import {
  HOSPITAL_LOGIN_FAILURE,
  HOSPITAL_LOGIN_REQUEST,
  HOSPITAL_LOGIN_SUCCESS,
  HOSPITAL_LOGOUT,
  HOSPITAL_REGISTER_FAILURE,
  HOSPITAL_REGISTER_REQUEST,
  HOSPITAL_REGISTER_SUCCESS,
} from './hospitalTypes'

const hospitalLoginRequest = () => {
  return {
    type: HOSPITAL_LOGIN_REQUEST,
  }
}
const hospitalLoginSuccess = (data) => {
  return {
    type: HOSPITAL_LOGIN_SUCCESS,
    payload: data,
  }
}

const hospitalLoginFailure = (error) => {
  return {
    type: HOSPITAL_LOGIN_FAILURE,
    payload: error,
  }
}

const hospitalRegisterRequest = () => {
  return {
    type: HOSPITAL_REGISTER_REQUEST,
  }
}
const hospitalRegisterSuccess = (data) => {
  return {
    type: HOSPITAL_REGISTER_SUCCESS,
    payload: data,
  }
}

const hospitalRegisterFailure = (error) => {
  return {
    type: HOSPITAL_REGISTER_FAILURE,
    payload: error,
  }
}

export const hospitalLogout = () => {
  return {
    type: HOSPITAL_LOGOUT,
  }
}
export const loginHospital =
  (registrationNumber, password) => async (dispatch) => {
    try {
      dispatch(hospitalLoginRequest())

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/hospital/login',
        { registrationNumber, password },
        config
      )

      dispatch(hospitalLoginSuccess(data))

      localStorage.setItem('hospitalInfo', JSON.stringify(data))
    } catch (err) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      dispatch(hospitalLoginFailure(errMsg))
    }
  }

export const registerHospital =
  (registrationNumber, password, name, address, phoneNumber) =>
  async (dispatch) => {
    try {
      dispatch(hospitalRegisterRequest())

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/hospital/register',
        { registrationNumber, password, name, address, phoneNumber },
        config
      )

      dispatch(hospitalRegisterSuccess(data))

      dispatch(hospitalLoginSuccess(data))

      localStorage.setItem('hospitalInfo', JSON.stringify(data))
    } catch (err) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      dispatch(hospitalRegisterFailure(errMsg))
    }
  }
