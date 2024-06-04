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

  // username: yup.string().min(3, obj => showErrors('Username', obj.value.length, obj.min)),
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

export const uploadRosterSchema = yup.object().shape({
  departmentId: yup.string(),
  rosterDate: yup.string().required('Date is required')
})

export const deductionsSchema = yup.object().shape({
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

export const leaveApplicationSchema = yup.object().shape({
  staff: yup.number().required('Staff is required'),
  leaveType: yup.string().required('Leave type is required'),
  start: yup.string().required('Start date is required'),
  end: yup.string().required('End date is required'),
  Reason: yup.string().required('Reason for leave is required')
})

export const querySchema = yup.object().shape({
  staff: yup.number().required('Staff is required'),
  date: yup.string().required('Date is required'),
  issuerName: yup.string().required('Issuer name is required'),
  queryType: yup.string(),
  comment: yup.string()
})

export const suspensionSchema = yup.object().shape({
  staff: yup.number().required('Staff is required'),
  issuerName: yup.string().required('Issuer name is required'),
  suspensionType: yup.string().required('Leave type is required'),
  start: yup.string().required('Start date is required'),
  end: yup.string().required('End date is required'),
  description: yup.string().required('Description for leave is required')
})

export const transferSchema = yup.object().shape({
  staff: yup.number().required('Staff is required'),
  issuerName: yup.string().required('Issuer name is required'),
  currentDepartment: yup.string().required('Current Department is required'),
  newDepartment: yup.string().required('New Department is required'),
  newDesignation: yup.string().required('New Designation is required'),
  reportingDate: yup.string().required('Resumption date is required'),
  reason: yup.string().required('Reason for transfer is required')
})

export const retirementSchema = yup.object().shape({
  staff: yup.number().required('Staff is required'),
  issuerName: yup.string(),
  date: yup.string().required('Date is required'),
  comment: yup.string()
})

export const terminationSchema = yup.object().shape({
  staff: yup.number().required('Staff is required'),
  issuerName: yup.string(),
  date: yup.string().required('Date is required'),
  reason: yup.string().required('Reason is required'),
  comment: yup.string()
})

export const memoSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  issuerName: yup.string(),
  date: yup.string().required('Date is required'),
  recipient: yup.string().required('Recipient is required'),
  body: yup.string().required('Memo body required')
})

export const meetingSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  issuerName: yup.string(),
  starts: yup.string().required('Date/Time is required'),
  ends: yup.string().required('Date/Time is required'),
  venue: yup.string(),
  link: yup.string(),
  description: yup.string().required('Meeting description required')
})
