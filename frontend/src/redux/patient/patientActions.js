import axios from 'axios'
import { logoutUser } from '../user/userActions'
import {
  PATIENTS_LIST_FAILURE,
  PATIENTS_LIST_REQUEST,
  PATIENTS_LIST_RESET,
  PATIENTS_LIST_SUCCESS,
  PATIENT_CREATE_FAILURE,
  PATIENT_CREATE_REQUEST,
  PATIENT_CREATE_RESET,
  PATIENT_CREATE_SUCCESS,
} from './patientTypes'

const fetchPatientsRequest = () => {
  return {
    type: PATIENTS_LIST_REQUEST,
  }
}

const fetchPatientsSuccess = (data) => {
  return {
    type: PATIENTS_LIST_SUCCESS,
    payload: data,
  }
}

const fetchPatientsFailure = (error) => {
  return {
    type: PATIENTS_LIST_FAILURE,
    payload: error,
  }
}

export const resetPatientsList = () => {
  return {
    type: PATIENTS_LIST_RESET,
  }
}

const createPatientsRequest = () => {
  return {
    type: PATIENT_CREATE_REQUEST,
  }
}

const createPatientsSuccess = (data) => {
  return {
    type: PATIENT_CREATE_SUCCESS,
    payload: data,
  }
}

const createPatientsFailure = (error) => {
  return {
    type: PATIENT_CREATE_FAILURE,
    payload: error,
  }
}

export const resetCreatePatient = () => {
  return {
    type: PATIENT_CREATE_RESET,
  }
}

export const fetchPatientsList = () => async (dispatch, getState) => {
  try {
    dispatch(fetchPatientsRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/patient', config)
    dispatch(fetchPatientsSuccess(data))
  } catch (err) {
    const errorMsg =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    dispatch(fetchPatientsFailure(errorMsg))
  }
}

export const createPatient = (patient) => async (dispatch, getState) => {
  try {
    dispatch(createPatientsRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/patient`, patient, config)

    dispatch(createPatientsSuccess(data))
  } catch (err) {
    const errMsg =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    if (errMsg === 'Not authorized, token failed') {
      dispatch(logoutUser())
    }
    dispatch(createPatientsFailure(errMsg))
  }
}
