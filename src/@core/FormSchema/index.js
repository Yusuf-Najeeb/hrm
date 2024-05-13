// ** Third Party Imports
import * as yup from 'yup'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} is a required field`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

export const SalaryItemSchema = yup.object().shape({
  name: yup.string().required('Salary item is required'),
  percentage: yup.number().typeError('Percentage can only be a number').required('Percentage is required')
})

export const personalInfoSchema = yup.object().shape({
  email: yup.string().email().required(),
  lastname: yup.string().required(),
  firstname: yup.string().required(),
  phone: yup
    .string()
    .typeError('Phone Number  is required')
    .min(11, obj => showErrors('Phone number', obj.value.length, obj.min)),
  bloodGroup: yup.string().required(),
  genotype: yup.string().required(),
  allergies: yup.string().required(),
  maritalStatus: yup.string().required(),
  address: yup.string().required()

  // additionalInfo: yup.string()
  // username: yup.string().min(3, obj => showErrors('Username', obj.value.length, obj.min)),
  // password: yup.string().min(5).required(),
})

export const workInfoSchema = yup.object().shape({
  designation: yup.string().required(),
  employeeNumber: yup.string().required(),
  grossSalary: yup.number().typeError('Gross salary must be a number'),
  accountNumber: yup.string().required(),
  rsaCompany: yup.string().required(),
  rsaNumber: yup.string().required(),
  roleId: yup.string().required(),
  departmentId: yup.string().required('Department is required')
})

export const nextOfKinSchema = yup.object().shape({
  firstname: yup.string().required('First Name is required'),
  lastname: yup.string().required('Last Name is required'),
  phone: yup.string().required('Phone Number is required'),
  email: yup.string().required('Email is required'),
  occupation: yup.string().required('Occupation is required'),
  address: yup.string().required('Address is required'),
  title: yup.string().required('Title is required'),
  relationship: yup.string().required('Relationship is required'),
  maritalStatus: yup.string().required('Marital Status is required')
})

export const updatePersonalInfoSchema = yup.object().shape({
  username: yup.string().min(3, obj => showErrors('Username', obj.value.length, obj.min)),
  email: yup.string().email().required(),
  lastname: yup.string().required(),
  firstname: yup.string().required(),
  phone: yup
    .string()
    .typeError('Phone Number  is required')
    .min(11, obj => showErrors('Phone number', obj.value.length, obj.min)),
  bloodGroup: yup.string().required(),
  genotype: yup.string().required(),
  allergies: yup.string().required(),
  maritalStatus: yup.string().required(),
  address: yup.string().required()

  // additionalInfo: yup.string()
})

export const requireName = yup.object().shape({
  name: yup.string().required('Department Name is required')
})

export const editDepartmentSchema = yup.object().shape({
  name: yup.string().required('Department Name is required'),
  hodId: yup.number()
})

export const editSalaryItemSchema = yup.object().shape({
  name: yup.string(),
  percentage: yup.number()
})

export const requireReason = yup.object().shape({
  reason: yup.string().required('Reason is required')
})

export const downloadRosterSchema = yup.object().shape({
  departmentId: yup.number().required('Department Name is required'),
  rosterDate: yup.string().required('Date is required')
})

export const deductionsSchema = yup.object().shape({
  // categoryId: yup.number().required('Deduction Category is required'),
  userId: yup.number().required('Staff is required'),
  period: yup.string().required('Period is required'),
  amount: yup.number().required('Amount is required'),
  description: yup.string().required('Description is required')
})

export const requirePeriod = yup.object().shape({
  period: yup.string().required('Period is required')
})

export const salaryItemSchema = yup.object().shape({
  name: yup.string().required('name is required'),
  percentage: yup.number().required('percentage is required')
})
