// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchRoles } from './asyncthunk'

const initialState = {
  loading: false,
  RolesData: [],
  paging: {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0
  }
}

export const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRoles.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchRoles.fulfilled, (state, action) => {
      state.loading = false
      state.RolesData = action?.payload?.data?.data
      state.paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchRoles.rejected, state => {
      state.loading = false
    })
  }
})

export default rolesSlice.reducer
