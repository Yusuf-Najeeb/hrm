import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const CreateDeductionItem = createAsyncThunk('deductioncategory/createItem', async () => {
  try {
    const response = await axios.post('/deductions/category', vals)

    notifySuccess('Created Deduction Category successfully')

    return response
  } catch (error) {
    notifyError('Error creating deduction category')

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

export const deleteDeductionCategory = createAsyncThunk('deductioncategory/deleteDeduction', async id => {
  try {
    const response = await axios.delete(`/deductions/category?id=${id}`)

    if (response.data.success) {
      notifySuccess('Deduction Category Deleted Successfully')
    }

    return {
      status: true
    }
  } catch (error) {
    notifyError('Error Deleting Deduction Category')

    return {
      status: false
    }
  }
})
