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

  export const deleteSalaryItem = createAsyncThunk('salaryItem/deleteSalaryItem', async (id) => {
    try {
      const response = await axios.delete(`salary-items?id=${id}`)
  
      if (response.data.success) {
        notifySuccess('Payslip Item Deleted Successfully')
      }
  
      return {
        status: true
      }
    } catch (error) {
      notifyError('Error deleting payslip item')
  
      return {
        status: false
      }
    }
  })