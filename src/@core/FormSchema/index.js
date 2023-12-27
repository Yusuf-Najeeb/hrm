// ** Third Party Imports
import * as yup from 'yup'

export const SalaryItemSchema = yup.object().shape({
    name: yup
      .string()
      .required('Salary item is required'),
    percentage: yup.number().typeError('Percentage can only be a number').required('Percentage is required'),
  })