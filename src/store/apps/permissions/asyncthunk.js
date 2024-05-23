import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPermissions = createAsyncThunk(
  'role/fetchPermission',

  async () => {
    try {
      const response = await axios.get(`/permission`)

      return response
    } catch (error) {
      console.log(error, 'errorrrr')

      // notifyError('Error Fetching Salary Items')
    }
  }
)

export const updatePermissions = async vals => {
  try {
    const response = axios.put(
      '/permission',
      {
        permissionIds: vals?.permissionIds,
        roleId: vals?.roleId
      },

      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
    notifySuccess('Permissions Updated')

    return response
  } catch (error) {
    console.log(error)
    notifyError('Update failed')
  }
}
