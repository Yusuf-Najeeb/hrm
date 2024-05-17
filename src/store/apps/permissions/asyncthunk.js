import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPermissions = createAsyncThunk(
  'permission/fetchItems',

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
