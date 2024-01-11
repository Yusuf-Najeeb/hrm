import axios from "axios"
import { notifySuccess } from "../../../@core/components/toasts/notifySuccess"
import { notifyError } from "../../../@core/components/toasts/notifyError"
import { createAsyncThunk } from "@reduxjs/toolkit"


  export const fetchRosterDetails = createAsyncThunk('roster/fetchItems',
  async (params)=> {
    try {
        const response = await axios.get(`/roster`, { 
        params: {
            departmentId: params.departmentId,
            period: params.period
        }}
        )

        return response
    } catch (error) {
      console.log(error, 'errorrrr')

        // notifyError('Error Fetching Salary Items')
    }
  }
  )

 