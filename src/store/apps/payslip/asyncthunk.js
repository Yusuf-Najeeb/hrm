import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const generatePayslip = async (vals) => {
  try {
    const response = await axios.post('/payslip', {period: vals.period})

    notifySuccess('Generated payslip successfully')

    return response
  } catch (error) {
    notifyError('Error generating payslip')

    return {
      success: false
    }
  }
}

export const sendPayslip = async (vals) => {
    try {
      const response = await axios.post('/payslip', {period: vals.period, send: true})
  
      notifySuccess('Payslip sent successfully')
  
      return response
    } catch (error) {
      notifyError('Error sending payslip')
  
      return {
        success: false
      }
    }
  }

  export const printPayslip = async (id, period) =>{
    try {
        const {data} = await axios.patch(`/payslip?id=${id}&period=${period}`)
    
    
       return data
      } catch (error) {
        notifyError('Error printing payslip')
      }
  }


export const fetchPayslips = createAsyncThunk('payslips/fetch ', async (values) => {
  try {
    const response = await axios.get(`/payslip?period=${values.period}&departmentId=${values.departmentId}`)

    return response
  } catch (error) {

    notifyError('Error Fetching Payslip')
  }
})

export const fetchPayslipForOneStaff = async (id) => {
    try {
      const response = await axios.get(`/payslip?userId=${id}`)
  
      return response?.data.data
    } catch (error) {
  
      notifyError('Error Fetching Payslips')
    }
  }


