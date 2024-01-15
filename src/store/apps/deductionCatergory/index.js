// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchDeductionCategory } from './asyncthunk'

const initialState = {
  loading: false,
  deductioncategoryData: []
}

export const deductioncategory = createSlice({
  name: 'deductioncategory',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchDeductionCategory.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchDeductionCategory.fulfilled, (state, action) => {
      state.loading = false

      state.deductioncategoryData = action?.payload?.data?.data
    })
    builder.addCase(fetchDeductionCategory.rejected, state => {
      state.loading = false
    })
  }
})

export default deductioncategory.reducer
