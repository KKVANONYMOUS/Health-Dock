import axios from 'axios'
import {
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

const fetchHospitalPatientDetailsRequest = () => {
  return {
    type: HOSPITAL_PATIENT_DETAILS_REQUEST,
  }
}
const fetchHospitalPatientDetailsSuccess = (data) => {
  return {
    type: HOSPITAL_PATIENT_DETAILS_SUCCESS,
    payload: data,
  }
}

const fetchHospitalPatientDetailsFailure = (error) => {
  return {
    type: HOSPITAL_PATIENT_DETAILS_FAILURE,
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

export const fetchHospitalPatientDetails =
  (aadharNumber) => async (dispatch, getState) => {
    try {
      dispatch(fetchHospitalPatientDetailsRequest())

      const {
        hospitalLogin: { hospitalInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${hospitalInfo.token}`,
        },
      }

      const { data } = await axios.get(
        `/api/hospital/dashboard/${aadharNumber}`,
        config
      )

      dispatch(fetchHospitalPatientDetailsSuccess(data))
    } catch (err) {
      const errorMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      dispatch(fetchHospitalPatientDetailsFailure(errorMsg))
    }
  }
