// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchDepartments } from './asyncthunk'

const initialState = {
    loadingDepartments: false,
    DepartmentsData: [],
    DepartmentsPaging: {
        currentPage: 1,
        totalItems: 0,
        itemsPerPage: 0,
        totalPages: 0
      },

  }

  export const departmentsSlice = createSlice({
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
            state.DepartmentsPaging = action?.payload?.data?.paging
        })
        builder.addCase(fetchDepartments.rejected, (state)=> {
            state.loadingDepartments = false
        })
    }
  })

  export default departmentsSlice.reducer