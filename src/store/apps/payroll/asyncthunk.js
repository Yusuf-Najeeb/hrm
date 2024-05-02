import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPayroll = createAsyncThunk('payroll/fetchPayrolls', async query => {
  try {
    const response = await axios.get(`/payroll`, {
      params: {
        year: query.year ? query.year : '',
        userId: query.userId ? query.userId : '',
        departmentId: query.departmentId ? query.departmentId : '',
        status: query.status ? query.status : ''
      }
    })

    return response
  } catch (error) {
    notifyError('Error Fetching payroll')
  }
})

export const generatePayroll = async vals => {
  try {
    const response = axios.post('/payroll', { period: vals?.period })

    return response
  } catch (err) {
    notifyError('Failed to generate payroll')
  }
}
