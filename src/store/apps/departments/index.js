// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchDepartments } from './asyncthunk'

const initialState = {
    loadingDepartments: false,
    DepartmentsData: [],

  }

  export const salaryItemSlice = createSlice({
    name: 'departments',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder.addCase(fetchDepartments.pending, (state)=> {
            state.loadingDepartments = true
        })
        builder.addCase(fetchDepartments.fulfilled, (state, action)=> {
            state.loadingDepartments = false
            state.DepartmentsData = action?.payload?.data?.data

        })
        builder.addCase(fetchDepartments.rejected, (state)=> {
            state.loadingDepartments = false
        })
    }
  })

  export default salaryItemSlice.reducer