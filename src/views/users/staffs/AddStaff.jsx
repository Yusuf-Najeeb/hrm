// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiStep from '@mui/material/Step'
import InputAdornment from '@mui/material/InputAdornment'

import { ButtonStyled } from '../../../@core/components/mui/button/ButtonStyledComponent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports

import StepperCustomDot from '../../forms/form-wizard/StepperCustomDot'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { CircularProgress, Dialog, DialogContent } from '@mui/material'
import { fetchDepartments } from '../../../store/apps/departments/asyncthunk'
import { fetchRoles } from '../../../store/apps/roles/asyncthunk'
import { useRoles } from '../../../hooks/useRoles'
import { useDepartments } from '../../../hooks/useDepartments'
import { useAppDispatch } from '../../../hooks'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'

// React Hook Form Schema
import { personalInfoSchema, workInfoSchema, nextOfKinSchema } from 'src/@core/Formschema'

// ** Custom Components Imports

import FormController from '../components/FormController'

// React Hook Form Utilities
import {
  defaultNextOfKinValues,
  defaultPersonalValues,
  defaultWorkInfoValues
} from '../../../@core/FormSchema/formDefaultvalues'

// Others
import { notifyWarn } from '../../../@core/components/toasts/notifyWarn'
import { formatFirstLetter } from '../../../@core/utils/format'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { uploadImage } from '../../../store/apps/upload'
import { steps } from '../../../@core/FormSchema/utils'
import SubmitSpinnerMessage from '../components/SubmitSpinnerMessage'
import CreateDepartment from './CreateDepartment'

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const Step = styled(MuiStep)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  '&:first-of-type': {
    paddingLeft: 0
  },
  '&:last-of-type': {
    paddingRight: 0
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '& .step-subtitle': {
    color: `${theme.palette.text.disabled} !important`
  },
  '& + svg': {
    color: theme.palette.text.disabled
  },
  '&.Mui-completed .step-title': {
    color: theme.palette.text.disabled
  },
  '&.Mui-completed + svg': {
    color: theme.palette.primary.main
  },
  [theme.breakpoints.down('md')]: {
    padding: 0,
    ':not(:last-of-type)': {
      marginBottom: theme.spacing(6)
    }
  }
}))

const AddStaff = ({ open, closeModal, refetchStaffs }) => {
  const dispatch = useAppDispatch()

  const [DepartmentsData] = useDepartments()
  const [RolesData] = useRoles()

  // ** States
  const [activeStep, setActiveStep] = useState(0)
  const [openDepartmentsModal, setOpenDepartmentsModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('/images/avatars/1.png')
  const [imageLinkPayload, setImageLinkPayload] = useState(null)
  const [refetch, setFetch] = useState(false)
  const [departmentModal, setDepartmentModal] = useState(false)

  const toggleDepartmentModal = () => {
    setDepartmentModal(!departmentModal)
  }

  // const [state, setState] = useState({
  //   password: '',
  //   showPassword: false
  // })

  // ** Hooks & Var
  const { settings } = useSettings()
  const smallScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
  const { direction } = settings

  // ** Form Hooks

  const {
    reset: personalReset,
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors, isValid: personalValuesValid },
    getValues: getPersonalValues
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalInfoSchema)
  })

  const {
    reset: workInfoReset,
    control: workInfoControl,
    handleSubmit: handleWorkInfoSubmit,
    formState: { errors: workInfoErrors, isValid: workValuesValid },
    getValues: getWorkInfoValues
  } = useForm({
    defaultValues: defaultWorkInfoValues,
    resolver: yupResolver(workInfoSchema)
  })

  const {
    reset: nextofKinReset,
    control: nextOfKinControl,
    handleSubmit: handleNextOfKinSubmit,
    formState: { errors: nextOfKinErrors, isSubmitting },
    getValues: getNextOfKinValues
  } = useForm({
    defaultValues: defaultNextOfKinValues,
    resolver: yupResolver(nextOfKinSchema)
  })

  // Handle Stepper
  const handleBack = () => {
    if (activeStep !== 0) {
      setActiveStep(prevActiveStep => prevActiveStep - 1)
    }

    return null
  }

  const handleForward = () => {
    switch (activeStep) {
      case 0:
        // Check for errors in the first step (Personal Info)
        if (personalValuesValid) {
          setActiveStep(prevActiveStep => prevActiveStep + 1)
        }
        break
      case 1:
        // Check for errors in the second step (Work Info)
        if (workValuesValid) {
          setActiveStep(prevActiveStep => prevActiveStep + 1)
        }
        break
      default:
        // For other steps, simply increment the activeStep
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
        console.log('eeeee')
        break
    }
  }

  const handleReset = () => {
    setPreviewUrl(null)
    setActiveStep(0)
    nextofKinReset({
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      occupation: '',
      address: '',
      title: '',
      relationship: '',
      maritalStatus: ''
    })
    workInfoReset({
      designation: '',
      employeeNumber: '',
      rsaCompany: '',
      rsaNumber: '',
      accountNumber: '',
      departmentId: '',
      grossSalary: '',
      roleId: ''
    })
    personalReset({
      // username: '',
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      phone: '',
      bloodGroup: '',
      genotype: '',
      allergies: '',
      maritalStatus: '',
      address: ''
    })
  }

  const handleInputImageChange = e => {
    const fileInput = e.target

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0]

      const fileSize = file.size / 1024 / 1024 // in MB

      if (fileSize > 5) {
        notifyWarn('FILE ERROR', 'file size cannot exceed 5Mb')

        return
      }

      if (file.type.startsWith('image/')) {
        const fileUrl = URL.createObjectURL(file)

        const formData = new FormData()
        formData.append('picture', file)

        uploadImage(formData).then(res => {
          if (res) {
            setPreviewUrl(fileUrl)
            setSelectedImage(file)
            setImageLinkPayload(res.url)
          }
        })
      } else {
        notifyWarn('FILE ERROR', 'Selected file is not an image.')
        setPreviewUrl(null)
      }
    } else {
      notifyWarn('FILE ERROR', 'No file selected.')
      setSelectedImage(null)
      setPreviewUrl(null)
    }
  }

  const onSubmitAllInfo = async () => {
    try {
      // Retrieve form values
      const workInfoValues = getWorkInfoValues()
      const personalValues = getPersonalValues()
      const nextOfKinValues = getNextOfKinValues()

      const payload = { ...personalValues, ...workInfoValues, image: imageLinkPayload ? imageLinkPayload : '' }
      payload.userNOK = { ...nextOfKinValues }

      const response = await axios.post('users', payload, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
      if (response.data.success) {
        setSelectedImage(null)
        notifySuccess('created Staff Successfully')
        handleReset()
        setActiveStep(0)
        closeModal()
        refetchStaffs()
      }
    } catch (error) {
      notifyError('Error creating staff')
    }
  }

  // Handle Password
  // const handleClickShowPassword = () => {
  //   setState({ ...state, showPassword: !state.showPassword })
  // }

  const updateFetch = () => setFetch(!refetch)

  const handleCreate = () => {
    setDepartmentModal(true)
  }

  const toggleDepartmentsModal = () => {
    setOpenDepartmentsModal(!openDepartmentsModal)
  }

  useEffect(() => {
    dispatch(fetchDepartments({ page: 1, limit: 200 }))
    dispatch(fetchRoles({ page: 1, limit: 200 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDepartmentsModal, refetch])

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
            <Grid item xs={12} sm={6} sx={{ mb: 6, display: 'flex', flexDirection: 'row', gap: '2rem' }}>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    border: '3px dotted',
                    borderRadius: 3,
                    p: 3,
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    <input
                      hidden
                      type='file'
                      accept='image/png, image/jpeg'
                      onChange={handleInputImageChange}
                      id='account-settings-upload-image'
                    />

                    <Icon icon='tabler:upload' fontSize='1.45rem' />
                  </ButtonStyled>
                  <Typography variant='body2' sx={{ mt: 2 }}>
                    Upload Staff Image
                  </Typography>
                </Box>
              </Grid>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  alignItems: 'center',
                  alignSelf: 'center'
                }}
              >
                {selectedImage && (
                  <img
                    src={`${previewUrl}`}
                    width={120}
                    height={100}
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    alt='user image'
                  />
                )}
              </Box>
            </Grid>

            <form key={0} onSubmit={handlePersonalSubmit(handleForward)}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {steps[0].title}
                  </Typography>
                  <Typography variant='caption' component='p'>
                    {steps[0].subtitle}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormController
                    name='firstname'
                    control={personalControl}
                    requireBoolean={true}
                    label='First Name'
                    error={personalErrors['firstname']}
                    errorMessage={personalErrors.firstname?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormController
                    name='lastname'
                    control={personalControl}
                    requireBoolean={true}
                    label='Last Name'
                    error={personalErrors['lastname']}
                    errorMessage={personalErrors?.lastname?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormController
                    name='email'
                    control={personalControl}
                    requireBoolean={true}
                    label='Email'
                    error={personalErrors['email']}
                    errorMessage={personalErrors?.email?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormController
                    name='phone'
                    control={personalControl}
                    requireBoolean={true}
                    label='Phone'
                    error={personalErrors['phone']}
                    errorMessage={personalErrors.phone?.message}
                  />
                </Grid>

                {/* <Grid item xs={12} sm={6}>
                  <FormController
                    name='username'
                    control={personalControl}
                    requireBoolean={true}
                    label='Username'
                    error={personalErrors['username']}
                    errorMessage={personalErrors?.username?.message}
                  />
                </Grid> */}
                {/*
                <Grid item xs={12} sm={4}>
                  <Controller
                    name='password'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        label='Password'
                        onChange={onChange}
                        id='stepper-linear-account-password'
                        error={Boolean(personalErrors.password)}
                        type={state.showPassword ? 'text' : 'password'}
                        {...(personalErrors.password && { helperText: personalErrors.password.message })}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onClick={handleClickShowPassword}
                                onMouseDown={e => e.preventDefault()}
                                aria-label='toggle password visibility'
                              >
                                <Icon fontSize='1.25rem' icon={state.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                </Grid> */}

                <Grid item xs={12} sm={6}>
                  <FormController
                    name='address'
                    control={personalControl}
                    requireBoolean={true}
                    label='Address'
                    error={personalErrors['address']}
                    errorMessage={personalErrors.address?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name='maritalStatus'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        value={value}
                        label='Marital Status'
                        onChange={onChange}
                        id='stepper-linear-personal-maritalStatus'
                        error={Boolean(personalErrors.maritalStatus)}
                        aria-describedby='stepper-linear-personal-maritalStatus-helper'
                        {...(personalErrors.maritalStatus && { helperText: personalErrors.maritalStatus.message })}
                      >
                        <MenuItem value='Single'>Single</MenuItem>
                        <MenuItem value='Married'>Married</MenuItem>
                        <MenuItem value='Divorced'>Divorced</MenuItem>
                        <MenuItem value='Others'>Others</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormController
                    name='genotype'
                    control={personalControl}
                    requireBoolean={true}
                    label='Genotype'
                    error={personalErrors['genotype']}
                    errorMessage={personalErrors.genotype?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormController
                    name='bloodGroup'
                    control={personalControl}
                    requireBoolean={true}
                    label='Blood Group'
                    error={personalErrors['bloodGroup']}
                    errorMessage={personalErrors.bloodGroup?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormController
                    name='allergies'
                    control={personalControl}
                    requireBoolean={true}
                    label='Allergies'
                    error={personalErrors['allergies']}
                    errorMessage={personalErrors.allergies?.message}
                  />
                </Grid>

                {/* <Grid item xs={12} sm={6}>
                <Controller
                  name='additionalInfo'
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Additional Information'
                      onChange={onChange}
                      error={Boolean(personalErrors['additionalInfo'])}
                      aria-describedby='stepper-linear-personal-additionalInfo'
                      {...(personalErrors['additionalInfo'] && { helperText: personalErrors.additionalInfo.message })}
                    />
                  )}
                />
              </Grid> */}

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant='tonal' color='secondary' onClick={handleBack}>
                    Back
                  </Button>

                  <Button type='submit' variant='contained'>
                    Next
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        )

      case 1:
        return (
          <form key={1} onSubmit={handleWorkInfoSubmit(handleForward)}>
            {/* <form key={1} > */}
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[1].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[1].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormController
                  name='designation'
                  control={workInfoControl}
                  requireBoolean={true}
                  label='Designation'
                  error={workInfoErrors['designation']}
                  errorMessage={workInfoErrors.designation?.message}
                />
              </Grid>

              <Grid item xs={10} sm={5}>
                <Controller
                  name='departmentId'
                  control={workInfoControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label='Department'
                      onChange={onChange}
                      error={Boolean(workInfoErrors.departmentId)}
                      aria-describedby='stepper-linear-account-departmentId'
                      {...(workInfoErrors.departmentId && { helperText: 'This field is required' })}
                    >
                      <MenuItem value=''>Select Department</MenuItem>
                      {DepartmentsData?.map(department => (
                        <MenuItem key={department?.id} value={department?.id}>
                          {formatFirstLetter(department?.name)}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={2} sm={1} sx={{ mt: 5.4 }}>
                <Button size='small' variant='contained' onClick={() => handleCreate()}>
                  <Icon fontSize='1.125rem' icon='tabler:plus' />
                </Button>
              </Grid>
              <Grid item xs={10} sm={4}>
                <Controller
                  name='roleId'
                  control={workInfoControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label='Role'
                      onChange={onChange}
                      error={Boolean(workInfoErrors.roleId)}
                      aria-describedby='stepper-linear-account-roleId'
                      {...(workInfoErrors.roleId && { helperText: 'This field is required' })}
                    >
                      <MenuItem value=''>Select Role</MenuItem>
                      {RolesData?.map(role => (
                        <MenuItem key={role?.id} value={role?.id}>
                          {formatFirstLetter(role?.name)}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController
                  name='employeeNumber'
                  control={workInfoControl}
                  requireBoolean={true}
                  label='Employee Number'
                  error={workInfoErrors['employeeNumber']}
                  errorMessage={workInfoErrors?.employeeNumber?.message}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController
                  name='grossSalary'
                  control={workInfoControl}
                  requireBoolean={true}
                  label='Gross Monthly Salary'
                  error={workInfoErrors['grossSalary']}
                  errorMessage={workInfoErrors?.grossSalary?.message}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController
                  name='accountNumber'
                  control={workInfoControl}
                  requireBoolean={true}
                  label='Account Number'
                  error={workInfoErrors['accountNumber']}
                  errorMessage={workInfoErrors?.accountNumber?.message}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController
                  name='rsaCompany'
                  control={workInfoControl}
                  requireBoolean={true}
                  label='Retirement Savings Account Company'
                  error={workInfoErrors['rsaCompany']}
                  errorMessage={workInfoErrors?.rsaCompany?.message}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController
                  name='rsaNumber'
                  control={workInfoControl}
                  requireBoolean={true}
                  label='Retirement Savings Account Number'
                  error={workInfoErrors['rsaNumber']}
                  errorMessage={workInfoErrors?.rsaNumber?.message}
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='contained' color='primary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 2:
        return (
          <form key={2} onSubmit={handleNextOfKinSubmit(onSubmitAllInfo)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[2].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[2].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormController
                  name='firstname'
                  control={nextOfKinControl}
                  requireBoolean={true}
                  label='First Name'
                  error={nextOfKinErrors['firstname']}
                  errorMessage={nextOfKinErrors?.firstname?.message}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormController
                  name='lastname'
                  control={nextOfKinControl}
                  requireBoolean={true}
                  label='Last Name'
                  error={nextOfKinErrors['lastname']}
                  errorMessage={nextOfKinErrors?.lastname?.message}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormController
                  name='phone'
                  control={nextOfKinControl}
                  requireBoolean={true}
                  label='Phone Number'
                  error={nextOfKinErrors['phone']}
                  errorMessage={nextOfKinErrors?.phone?.message}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController
                  name='email'
                  control={nextOfKinControl}
                  requireBoolean={true}
                  label='Email'
                  error={nextOfKinErrors['email']}
                  errorMessage={nextOfKinErrors?.email?.message}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController
                  name='occupation'
                  control={nextOfKinControl}
                  requireBoolean={true}
                  label='Occupation'
                  error={nextOfKinErrors['occupation']}
                  errorMessage={nextOfKinErrors?.occupation?.message}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController
                  name='address'
                  control={nextOfKinControl}
                  requireBoolean={true}
                  label='Address'
                  error={nextOfKinErrors['address']}
                  errorMessage={nextOfKinErrors?.address?.message}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name='title'
                  control={nextOfKinControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label='Title'
                      onChange={onChange}
                      id='stepper-linear-personal-title'
                      error={Boolean(nextOfKinErrors.title)}
                      aria-describedby='stepper-linear-personal-title-helper'
                      {...(nextOfKinErrors.title && { helperText: nextOfKinErrors.title.message })}
                    >
                      <MenuItem value='Master'>Master</MenuItem>
                      <MenuItem value='Mr'>Mr</MenuItem>
                      <MenuItem value='Miss'>Miss</MenuItem>
                      <MenuItem value='Mrs'>Mrs</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController
                  name='relationship'
                  control={nextOfKinControl}
                  requireBoolean={true}
                  label='Relationship'
                  error={nextOfKinErrors['relationship']}
                  errorMessage={nextOfKinErrors?.relationship?.message}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name='maritalStatus'
                  control={nextOfKinControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label='Marital Status'
                      onChange={onChange}
                      id='stepper-linear-nextOfKin-maritalStatus'
                      error={Boolean(nextOfKinErrors.maritalStatus)}
                      aria-describedby='stepper-linear-nextOfKin-maritalStatus-helper'
                      {...(nextOfKinErrors.maritalStatus && { helperText: nextOfKinErrors.maritalStatus.message })}
                    >
                      <MenuItem value='Single'>Single</MenuItem>
                      <MenuItem value='Married'>Married</MenuItem>
                      <MenuItem value='Divorced'>Divorced</MenuItem>
                      <MenuItem value='Others'>Others</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='contained' color='primary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained' disabled={isSubmitting}>
                  {isSubmitting ? <SubmitSpinnerMessage /> : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      default:
        return null
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return getStepContent(activeStep)
    }
  }

  return (
    <Fragment>
      <Dialog
        fullWidth
        open={open}
        maxWidth='md'
        scroll='body'
        onClose={closeModal}
        //eslint-disable-next-line
        // TransitionComponent={Transition}

        // onBackdropClick={() => setShow(false)}
        // sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}

        sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', maxWidth: 980 } }}
      >
        <DialogContent
          sx={{
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={closeModal}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <Card>
            <CardContent>
              <StepperWrapper>
                <Stepper
                  activeStep={activeStep}
                  connector={
                    !smallScreen ? (
                      <Icon icon={direction === 'ltr' ? 'tabler:chevron-right' : 'tabler:chevron-left'} />
                    ) : null
                  }
                >
                  {steps.map((step, index) => {
                    const RenderAvatar = activeStep >= index ? CustomAvatar : Avatar
                    const labelProps = {}
                    if (index === activeStep) {
                      labelProps.error = false
                      if (
                        // personalErrors.username ||

                        personalErrors.email ||
                        personalErrors.lastname ||
                        personalErrors.firstname ||
                        personalErrors.allergies ||
                        personalErrors.bloodGroup ||
                        personalErrors.genotype ||
                        activeStep === 0
                      ) {
                        labelProps.error = true
                      } else if (
                        workInfoErrors.designation ||
                        workInfoErrors.departmentId ||
                        workInfoErrors.employeeNumber ||
                        workInfoErrors.rsaCompany ||
                        workInfoErrors.rsaNumber ||
                        (workInfoErrors.grossSalary && activeStep === 1)
                      ) {
                        labelProps.error = true
                      } else if (
                        (nextOfKinErrors.title ||
                          nextOfKinErrors.lastname ||
                          nextOfKinErrors.phone ||
                          nextOfKinErrors.email) &&
                        activeStep === 2
                      ) {
                        labelProps.error = true
                      } else {
                        labelProps.error = false
                      }
                    }

                    return (
                      <Step key={index}>
                        <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                          <div className='step-label'>
                            <RenderAvatar
                              variant='rounded'
                              {...(activeStep >= index && { skin: 'light' })}
                              {...(activeStep === index && { skin: 'filled' })}
                              {...(activeStep >= index && { color: 'primary' })}
                              sx={{
                                ...(activeStep === index && { boxShadow: theme => theme.shadows[3] }),
                                ...(activeStep > index && {
                                  color: theme => hexToRGBA(theme.palette.primary.main, 0.4)
                                })
                              }}
                            >
                              <Icon icon={step.icon} />
                            </RenderAvatar>
                            <div>
                              <Typography className='step-title'>{step.title}</Typography>
                              <Typography className='step-subtitle'>{step.subtitle}</Typography>
                            </div>
                          </div>
                        </StepLabel>
                      </Step>
                    )
                  })}
                </Stepper>
              </StepperWrapper>
            </CardContent>
            <Divider sx={{ m: '0 !important' }} />
            <CardContent>{renderContent()}</CardContent>
          </Card>
        </DialogContent>
        {departmentModal && (
          <CreateDepartment open={handleCreate} closeModal={toggleDepartmentModal} refetchDepartment={updateFetch} />
        )}
      </Dialog>
    </Fragment>
  )
}

export default AddStaff
