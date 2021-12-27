import axios from 'axios'
import {
  PATIENTS_LIST_FAILURE,
  PATIENTS_LIST_REQUEST,
  PATIENTS_LIST_RESET,
  PATIENTS_LIST_SUCCESS,
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
