import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const createDeduction = createAsyncThunk('deduction/createItem', async vals => {
  try {
    const response = await axios.post('/deductions', vals, {
      headers: { 'Content-Type': 'application/json' }
    })

    // notifySuccess(`Added ${vals?.type}`)

    return response
  } catch (error) {
    // notifyError(`error add ${vals?.type}`)

    return {
      success: false
    }
  }
})

export const fetchDeductions = createAsyncThunk('deductions/fetch ', async () => {
  try {
    const response = await axios.get('/deductions')

    // console.log(response, 'deductions res')

    return response
  } catch (error) {
    notifyError('Error Fetching Deductions')
  }
})

export const deleteDeduction = createAsyncThunk('/delete-deduction', async id => {
  try {
    const response = await axios.delete(`/deductions?id=${id}`)

    if (response.data.success) {
      notifySuccess('Deduction  Deleted Successfully')
    }

    return {
      status: true
    }
  } catch (error) {
    notifyError('Error deleting deduction')

    return {
      status: false
    }
  }
})

export const fetchDeductionsForOneUser = async (id, period) => {
  try {
    const response = await axios.get(`/deductions?period=${period}&userId=${id}`)

    return response?.data.data
  } catch (error) {
    notifyError('Error Fetching Deductions')
  }
}
