import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const createDepartment = createAsyncThunk('department/createItem', async vals => {
  try {
    const response = await axios.post('department', vals)

    notifySuccess('Department created successfully')

    return response
  } catch (error) {
    console.log(error, 'error')
    notifyError('Error creating department')

    return {
      success: false
    }
  }
})

export const fetchDepartments = createAsyncThunk('departments/fetchItems', async query => {
  try {
    const response = await axios.get(`/department`, {
      params: {
        page: query?.page,
        limit: query?.limit
      }
    })

    return response
  } catch (error) {
    console.log(error, 'errorrrr')

    // notifyError('Error Fetching Salary Items')
  }
})

export const deleteDepartment = createAsyncThunk('department/deleteProducts', async id => {
  try {
    const response = await axios.delete(`department?id=${id}`)

    if (response.data.success) {
      notifySuccess('Department Deleted Successfully')
    }

    return {
      status: true
    }
  } catch (error) {
    notifyError('Error deleting department')

    return {
      status: false
    }
  }
})
