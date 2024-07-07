import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchStaffs = createAsyncThunk('staffs/fetchStaffs', async query => {
  try {
    const response = await axios.get(`/users`, {
      params: {
        page: query ? query.page : '',
        departmentId: query ? query.departmentId : '',
        q: query ? query.q : ''
      }
    })

    // console.log(response, 'staffs')

    return response
  } catch (error) {
    notifyError('Error Fetching Staffs')
  }
})

export const getAllStaffsInOneDepartment = async id => {
  try {
    const { data } = await axios.get(`users?departmentId=${id}`)

    return data
  } catch (error) {
    notifyError('Error fetching staffs in department')
  }
}

export const undoDeleteStaff = async id => {
  try {
    const response = await axios.delete(`/users/undo/?id=${id}`)

    if (response.data.success) {
      notifySuccess('Staff Reactivated')
    }

    return response
  } catch (error) {
    notifyError('Error Deleting Staff')
  }
}
