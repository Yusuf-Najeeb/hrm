// ** Third Party Imports
import * as yup from 'yup'

export const SalaryItemSchema = yup.object().shape({
    name: yup
      .string()
      .required('Salary item is required'),
    percentage: yup.number().typeError('Percentage can only be a number').required('Percentage is required'),
  })

  export const personalInfoSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    lastname: yup.string().required(),
    firstname: yup.string().required(),
    password: yup.string().min(6).required(),
    phone: yup
  .string()
  .typeError('Contact Number field is required')
  .min(11, obj => showErrors('Phone number', obj.value.length, obj.min)),
  bloodGroup: yup.string().required(),
  genotype: yup.string().required(),
  allergies: yup.string().required(),
  maritalStatus: yup.string().required(),
  image: yup.string().required(),
  additionalInfo: yup.string()
  })

  export const workInfoSchema = yup.object().shape({
    designation: yup.string().required(),
    employeeNumber: yup.string().required(),
    grossSalary: yup.number().typeError('Gross salary must be a number'),
    accountNumber: yup.string().required(),
    rsaCompany: yup.string().required(),
    rsaNumber: yup.string().required(),
    departmentId: yup.string().required('Department is required'),
  
  })

  export const requireName = yup.object().shape({
    name: yup.string().required('Department Name is required')
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
    maritalStatus: yup.string().required('Marital Status is required'),
  
  })