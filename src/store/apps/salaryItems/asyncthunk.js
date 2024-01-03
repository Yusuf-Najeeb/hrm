import axios from "axios"
import { notifySuccess } from "../../../@core/components/toasts/notifySuccess"
import { notifyError } from "../../../@core/components/toasts/notifyError"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const createSalaryItem = createAsyncThunk(
    'salary/createItem',
    async () => {
      try {
        const response = await axios.post('salary-items', vals)
  
        notifySuccess('Added Salary Item')

        return response
  
        // return {
        //   success: true,
        //   data: data
        // }
      } catch (error) {
        notifyError('error create category')
  
        return {
          success: false
        }
      }
    }
  )

  export const fetchSalaryItems = createAsyncThunk('salary/fetchItems',
  async ()=> {
    try {
        const response = await axios.get('/salary-items')

        return response
    } catch (error) {
      console.log(error, 'errorrrr')

        // notifyError('Error Fetching Salary Items')
    }
  }
  )