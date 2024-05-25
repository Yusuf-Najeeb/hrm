import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const createRole = createAsyncThunk('role/createItem', async vals => {
  try {
    const response = await axios.post('role', vals)

    notifySuccess('Role created successfully')

    return response
  } catch (error) {
    console.log(error, 'error')
    notifyError('Error creating Role')

    return {
      success: false
    }
  }
})

export const fetchRoles = createAsyncThunk('roles/fetchItems', async query => {
  try {
    const response = await axios.get(`/role`, {
      params: {
        page: query.page,
        limit: query.limit,
        userLimit: 100,
        userPage: 1
      }
    })

    return response
  } catch (error) {
    console.log(error, 'errorrrr')

    // notifyError('Error Fetching Salary Items')
  }
})

export const fetchRolePermissions = async id => {
  try {
    const resp = await axios.get(`/role/${id}`)

    return resp
  } catch (err) {
    console.log(err)
    notifyError('failed to fetch permissions')
  }
}

export const deleteRole = createAsyncThunk('deleterole', async id => {
  try {
    const response = await axios.patch(`role/${id}`)

    if (response.data.success) {
      notifySuccess('Roles Deleted Successfully')
    }

    return {
      status: true
    }
  } catch (error) {
    notifyError('Error deleting Role')

    return {
      status: false
    }
  }
})
