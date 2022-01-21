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
  PATIENT_DETAILS_FAILURE,
  PATIENT_DETAILS_REQUEST,
  PATIENT_DETAILS_RESET,
  PATIENT_DETAILS_SUCCESS,
  PATIENT_UPDATE_FAILURE,
  PATIENT_UPDATE_REQUEST,
  PATIENT_UPDATE_RESET,
  PATIENT_UPDATE_SUCCESS,
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

const createPatientRequest = () => {
  return {
    type: PATIENT_CREATE_REQUEST,
  }
}

const createPatientSuccess = (data) => {
  return {
    type: PATIENT_CREATE_SUCCESS,
    payload: data,
  }
}

const createPatientFailure = (error) => {
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

const updatePatientRequest = () => {
  return {
    type: PATIENT_UPDATE_REQUEST,
  }
}

const updatePatientSuccess = (data) => {
  return {
    type: PATIENT_UPDATE_SUCCESS,
    payload: data,
  }
}

const updatePatientFailure = (error) => {
  return {
    type: PATIENT_UPDATE_FAILURE,
    payload: error,
  }
}

export const resetUpdatePatient = () => {
  return {
    type: PATIENT_UPDATE_RESET,
  }
}

const fetchPatientDetailsRequest = () => {
  return {
    type: PATIENT_DETAILS_REQUEST,
  }
}

const fetchPatientDetailsSuccess = (data) => {
  return {
    type: PATIENT_DETAILS_SUCCESS,
    payload: data,
  }
}

export const resetfetchPatientDetails = () => {
  return {
    type: PATIENT_DETAILS_RESET,
  }
}

const fetchPatientDetailsFailure = (error) => {
  return {
    type: PATIENT_DETAILS_FAILURE,
    payload: error,
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

export const createPatient =
  (name, aadharNumber, dob, age, bloodGroup, gender, phoneNumber) =>
  async (dispatch, getState) => {
    try {
      dispatch(createPatientRequest())

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        '/api/patient',
        { phoneNumber, aadharNumber, name, dob, age, bloodGroup, gender },
        config
      )

      dispatch(createPatientSuccess(data))
    } catch (err) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      if (errMsg === 'Not authorized, token failed') {
        dispatch(logoutUser())
      }
      dispatch(createPatientFailure(errMsg))
    }
  }

export const fetchPatientDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(fetchPatientDetailsRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/patient/${id}`, config)

    dispatch(fetchPatientDetailsSuccess(data))
  } catch (err) {
    const errorMsg =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    dispatch(fetchPatientDetailsFailure(errorMsg))
  }
}

export const updatePatient =
  (name, aadharNumber, dob, age, bloodGroup, gender, id, image) =>
  async (dispatch, getState) => {
    try {
      dispatch(updatePatientRequest())

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(
        `/api/patient/${id}`,
        { name, aadharNumber, dob, age, bloodGroup, gender, image },
        config
      )

      dispatch(updatePatientSuccess(data))
    } catch (err) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      if (errMsg === 'Not authorized, token failed') {
        dispatch(logoutUser())
      }
      dispatch(updatePatientFailure(errMsg))
    }
  }
