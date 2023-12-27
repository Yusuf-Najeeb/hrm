// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchSalaryItems } from './asyncthunk'

const initialState = {
    loadingSalaryItems: false,
    SalaryItemsData: [],

  }

  export const salaryItemSlice = createSlice({
    name: 'salaryItems',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder.addCase(fetchSalaryItems.pending, (state)=> {
            state.loadingSalaryItems = true
        })
        builder.addCase(fetchSalaryItems.fulfilled, (state, action)=> {
            state.loadingSalaryItems = false
            
            state.SalaryItemsData = action?.payload?.data?.result

        })
        builder.addCase(fetchSalaryItems.rejected, (state)=> {
            state.loadingSalaryItems = true
        })
    }
  })

  export default salaryItemSlice.reducer