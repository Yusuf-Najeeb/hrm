import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const LoginUser = createAsyncThunk('auth/login', async (values) => {
  try {
    const { data } = await axios({
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      url: `users/login`,
      data: {
        ...values
      }
    })

    return {
      data: data.data,
      success: true
    }
  } catch (error) {
    console.log(error, 'err')
    throw new Error(error.response?.data?.message || 'failed to Login')
  }
})
