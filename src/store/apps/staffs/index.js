// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchStaffs } from './asyncthunk'

const initialState = {
  loading: false,
  StaffsData: [],
  paging: {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0
  },
  aggregations: []
}

export const staffSlice = createSlice({
  name: 'staffs',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchStaffs.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchStaffs.fulfilled, (state, action) => {
      console.log(action.payload, 'action payload')
      state.loading = false
      state.StaffsData = action?.payload?.data?.data
      state.aggregations = action?.payload?.data?.aggregations
      state.paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchStaffs.rejected, state => {
      state.loading = false
    })
  }
})

export default staffSlice.reducer
