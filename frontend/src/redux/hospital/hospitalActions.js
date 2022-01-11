import axios from 'axios'
import {
  HOSPITAL_LOGIN_FAILURE,
  HOSPITAL_LOGIN_REQUEST,
  HOSPITAL_LOGIN_SUCCESS,
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
