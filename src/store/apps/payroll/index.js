// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchPayroll } from './asyncthunk'

const initialState = {
  loading: false,
  PayrollData: [],
  paging: {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0
  },
  aggregations: []
}

export const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPayroll.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchPayroll.fulfilled, (state, action) => {
      state.loading = false
      state.PayrollData = action?.payload?.data?.data
      state.aggregations = action?.payload?.data?.aggregations
      state.paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchPayroll.rejected, state => {
      state.loading = false
    })
  }
})

export default payrollSlice.reducer
