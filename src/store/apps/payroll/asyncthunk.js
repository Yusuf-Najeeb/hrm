import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPayroll = createAsyncThunk('payroll/fetchPayrolls', async query => {
  try {
    const response = await axios.get(`/payroll`, {
      params: {
        year: query ? query.year : '',
        userId: query ? query.userId : '',
        departmentId: query ? query.departmentId : ''
      }
    })

    return response
  } catch (error) {
    notifyError('Error Fetching payroll')
  }
})
