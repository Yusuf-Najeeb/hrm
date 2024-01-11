// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchRosterDetails } from './asyncthunk'

const initialState = {
    loading: false,
    RosterItems: [],
    Paging: {
        currentPage: 1,
        totalItems: 0,
        itemsPerPage: 0,
        totalPages: 0
      },

  }

  export const departmentsSlice = createSlice({
    name: 'roster',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder.addCase(fetchRosterDetails.pending, (state)=> {
            state.loading = true
        })
        builder.addCase(fetchRosterDetails.fulfilled, (state, action)=> {
            state.loading = false
            state.RosterItems = action?.payload?.data?.data
            state.Paging = action?.payload?.data?.paging
        })
        builder.addCase(fetchRosterDetails.rejected, (state)=> {
            state.loading = false
        })
    }
  })

  export default departmentsSlice.reducer