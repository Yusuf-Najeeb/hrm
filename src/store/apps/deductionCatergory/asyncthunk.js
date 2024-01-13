import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const CreateDeductionItem = createAsyncThunk('deductioncategory/createItem', async () => {
  try {
    const response = await axios.post('/deductions/category', vals)

    notifySuccess('Added deduction')

    return response
  } catch (error) {
    notifyError('error add deduction')

    return {
      success: false
    }
  }
})

export const fetchDeductionCategory = createAsyncThunk('Deduction/DeductionCategory ', async () => {
  try {
    const response = await axios.get('/deductions/category')

    return response
  } catch (error) {
    console.log(error, 'errorrrr')

    // notifyError('Error Fetching Salary Items')
  }
})

export const deleteDeduction = createAsyncThunk('deductioncategory/deleteDeduction', async id => {
  try {
    const response = await axios.delete(`/deductions/category?id=${id}`)

    if (response.data.success) {
      notifySuccess('Deduction  Deleted Successfully')
    }

    return {
      status: true
    }
  } catch (error) {
    notifyError('Error deleting Deduction')

    return {
      status: false
    }
  }
})
