// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchPermissions } from './asyncthunk'

const initialState = {
  loading: false,
  PermissionsData: []
}

export const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPermissions.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchPermissions.fulfilled, (state, action) => {
      state.loading = false
      state.PermissionsData = action?.payload?.data?.data
    })
    builder.addCase(fetchPermissions.rejected, state => {
      state.loading = false
    })
  }
})

export default permissionSlice.reducer
