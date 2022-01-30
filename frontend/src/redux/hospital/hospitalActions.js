import axios from 'axios'
import {
  FETCH_AADHAR_NUMBER_LIST_FAILURE,
  FETCH_AADHAR_NUMBER_LIST_REQUEST,
  FETCH_AADHAR_NUMBER_LIST_SUCCESS,
  HOSPITAL_ADD_PATIENT_RECORD_FAILURE,
  HOSPITAL_ADD_PATIENT_RECORD_REQUEST,
  HOSPITAL_ADD_PATIENT_RECORD_SUCCESS,
  HOSPITAL_DELETE_PATIENT_RECORD_FAILURE,
  HOSPITAL_DELETE_PATIENT_RECORD_REQUEST,
  HOSPITAL_DELETE_PATIENT_RECORD_SUCCESS,
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
  HOSPITAL_UPDATE_PATIENT_RECORD_FAILURE,
  HOSPITAL_UPDATE_PATIENT_RECORD_REQUEST,
  HOSPITAL_UPDATE_PATIENT_RECORD_RESET,
  HOSPITAL_UPDATE_PATIENT_RECORD_SUCCESS,
  HOSPITAL_VIEW_PATIENT_RECORD_FAILURE,
  HOSPITAL_VIEW_PATIENT_RECORD_REQUEST,
  HOSPITAL_VIEW_PATIENT_RECORD_SUCCESS,
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

const addHospitalPatientRecordRequest = () => {
  return {
    type: HOSPITAL_ADD_PATIENT_RECORD_REQUEST,
  }
}

const addHospitalPatientRecordSuccess = (data) => {
  return {
    type: HOSPITAL_ADD_PATIENT_RECORD_SUCCESS,
    payload: data,
  }
}

const addHospitalPatientRecordFailure = (error) => {
  return {
    type: HOSPITAL_ADD_PATIENT_RECORD_FAILURE,
    payload: error,
  }
}

const fetchHospitalPatientRecordRequest = () => {
  return {
    type: HOSPITAL_VIEW_PATIENT_RECORD_REQUEST,
  }
}

const fetchHospitalPatientRecordSuccess = (data) => {
  return {
    type: HOSPITAL_VIEW_PATIENT_RECORD_SUCCESS,
    payload: data,
  }
}

const fetchHospitalPatientRecordFailure = (error) => {
  return {
    type: HOSPITAL_VIEW_PATIENT_RECORD_FAILURE,
    payload: error,
  }
}

const deleteHospitalPatientRecordRequest = () => {
  return {
    type: HOSPITAL_DELETE_PATIENT_RECORD_REQUEST,
  }
}

const deleteHospitalPatientRecordSuccess = () => {
  return {
    type: HOSPITAL_DELETE_PATIENT_RECORD_SUCCESS,
  }
}

const deleteHospitalPatientRecordFailure = (error) => {
  return {
    type: HOSPITAL_DELETE_PATIENT_RECORD_FAILURE,
    payload: error,
  }
}

const updateHospitalPatientRecordRequest = () => {
  return {
    type: HOSPITAL_UPDATE_PATIENT_RECORD_REQUEST,
  }
}

const updateHospitalPatientRecordSuccess = () => {
  return {
    type: HOSPITAL_UPDATE_PATIENT_RECORD_SUCCESS,
  }
}

const updateHospitalPatientRecordFailure = (error) => {
  return {
    type: HOSPITAL_UPDATE_PATIENT_RECORD_FAILURE,
    payload: error,
  }
}

export const resetUpdateHospitalPatientRecord = () => {
  return {
    type: HOSPITAL_UPDATE_PATIENT_RECORD_RESET,
  }
}

const fetchAadharNumberListRequest = () => {
  return {
    type: FETCH_AADHAR_NUMBER_LIST_REQUEST,
  }
}

const fetchAadharNumberListSuccess = (data) => {
  return {
    type: FETCH_AADHAR_NUMBER_LIST_SUCCESS,
    payload: data,
  }
}

const fetchAadharNumberListFailure = (error) => {
  return {
    type: FETCH_AADHAR_NUMBER_LIST_FAILURE,
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

export const addhospitalPatientRecord =
  (aadharNumber, description, attendedBy, date, report, hospitalName) =>
  async (dispatch, getState) => {
    try {
      dispatch(addHospitalPatientRecordRequest())

      const {
        hospitalLogin: { hospitalInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${hospitalInfo.token}`,
        },
      }

      const { data } = await axios.post(
        `/api/hospital/dashboard/${aadharNumber}`,
        { description, attendedBy, date, report, hospitalName },
        config
      )

      dispatch(addHospitalPatientRecordSuccess(data))
    } catch (err) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      dispatch(addHospitalPatientRecordFailure(errMsg))
    }
  }

export const deleteHospitalPatientRecord =
  (aadharNumber, recordId) => async (dispatch, getState) => {
    try {
      dispatch(deleteHospitalPatientRecordRequest())
      const {
        hospitalLogin: { hospitalInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${hospitalInfo.token}`,
        },
      }

      await axios.delete(
        `/api/hospital/dashboard/${aadharNumber}/record/${recordId}`,
        config
      )

      dispatch(deleteHospitalPatientRecordSuccess())
    } catch (err) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      dispatch(deleteHospitalPatientRecordFailure(errMsg))
    }
  }

export const fetchHospitalPatientRecord =
  (aadharNumber, recordId) => async (dispatch, getState) => {
    try {
      dispatch(fetchHospitalPatientRecordRequest())
      const {
        hospitalLogin: { hospitalInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${hospitalInfo.token}`,
        },
      }

      const { data } = await axios.get(
        `/api/hospital/dashboard/${aadharNumber}/record/${recordId}`,
        config
      )

      dispatch(fetchHospitalPatientRecordSuccess(data))
    } catch (err) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      dispatch(fetchHospitalPatientRecordFailure(errMsg))
    }
  }

export const updateHospitalPatientRecord =
  (
    aadharNumber,
    recordId,
    date,
    description,
    hospitalName,
    attendedBy,
    report
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch(updateHospitalPatientRecordRequest())
      const {
        hospitalLogin: { hospitalInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${hospitalInfo.token}`,
        },
      }

      const { data } = await axios.put(
        `/api/hospital/dashboard/${aadharNumber}/record/${recordId}`,
        { date, description, hospitalName, attendedBy, report },
        config
      )

      dispatch(updateHospitalPatientRecordSuccess(data))
    } catch (err) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      dispatch(updateHospitalPatientRecordFailure(errMsg))
    }
  }

export const logoutHospital = () => (dispatch) => {
  localStorage.removeItem('hospitalInfo')
  dispatch(hospitalLogout())
  document.location.href = '/hospital/login'
}

export const fetchAadharNumberList = () => async (dispatch, getState) => {
  try {
    dispatch(fetchAadharNumberListRequest())
    const {
      hospitalLogin: { hospitalInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${hospitalInfo.token}`,
      },
    }

    const { data } = await axios.get(
      '/api/hospital/dashboard/aadharNumbers',
      config
    )

    dispatch(fetchAadharNumberListSuccess(data))
  } catch (err) {
    const errMsg =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    dispatch(fetchAadharNumberListFailure(errMsg))
  }
}
