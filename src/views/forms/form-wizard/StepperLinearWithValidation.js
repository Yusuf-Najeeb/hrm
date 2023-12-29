// // ** React Imports
// import { Fragment, useEffect, useState } from 'react'

// // ** MUI Imports
// import Box from '@mui/material/Box'
// import Card from '@mui/material/Card'
// import Step from '@mui/material/Step'
// import Grid from '@mui/material/Grid'
// import Button from '@mui/material/Button'
// import Divider from '@mui/material/Divider'
// import Stepper from '@mui/material/Stepper'
// import MenuItem from '@mui/material/MenuItem'
// import StepLabel from '@mui/material/StepLabel'
// import Typography from '@mui/material/Typography'
// import IconButton from '@mui/material/IconButton'
// import CardContent from '@mui/material/CardContent'
// import InputAdornment from '@mui/material/InputAdornment'

// // ** Third Party Imports
// import * as yup from 'yup'
// import toast from 'react-hot-toast'
// import { useForm, Controller } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'

// import { personalInfoSchema , workInfoSchema, nextOfKinSchema} from 'src/@core/Formschema'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // ** Custom Components Imports
// import StepperCustomDot from './StepperCustomDot'
// import CustomTextField from 'src/@core/components/mui/text-field'

// // ** Styled Components
// import StepperWrapper from 'src/@core/styles/mui/stepper'
// import { defaultNextOfKinValues, defaultPersonalValues, defaultWorkInfoValues } from '../../../@core/FormSchema/loginFormWizardDefaultValues'
// import { ButtonStyled } from '../../../@core/components/mui/button/ButtonStyledComponent'
// import { notifyWarn } from '../../../@core/components/toasts/notifyWarn'
// import { useDepartments } from '../../../hooks/useDepartments'
// import { fetchDepartments } from '../../../store/apps/departments/asyncthunk'
// import { useAppDispatch, useAppSelector } from '../../../hooks'
// import { formatFirstLetter } from '../../../@core/utils/format'
// import CreateDepartment from '../../users/departments/CreateDepartment'

// const steps = [
//   {
//     title: 'Personal Info',
//     subtitle: 'Setup Information'
//   },
//   {
//     title: 'Work Information',
//     subtitle: 'Add Staff Official Information'
//   },
//   {
//     title: 'Next of Kin Details',
//     subtitle: "Add Staff's Next of Kin Details"
//   }
// ]

// const StepperLinearWithValidation = () => {
//   const dispatch = useAppDispatch()
//   const DepartmentsData = useAppSelector(store => store.departments.DepartmentsData)



//   // const [DepartmentsData, loadingDepartments] = useDepartments()

//   // ** States
//   const [activeStep, setActiveStep] = useState(0)

//   const [state, setState] = useState({
//     password: '',
//     showPassword: false
//   })

//   const [openDepartmentsModal, setOpenDepartmentsModal] = useState(false)
//   const [selectedImage, setSelectedImage] = useState(null)
//   const [previewUrl, setPreviewUrl] = useState('/images/avatars/1.png')

//   // ** Hooks
//   const {
//     reset: workInfoReset,
//     control: workInfoControl,
//     handleSubmit: handleWorkInfoSubmit,
//     formState: { errors: workInfoErrors },
//     getValues: getWorkInfoValues
//   } = useForm({
//     defaultValues: defaultWorkInfoValues,
//     resolver: yupResolver(workInfoSchema)
//   })

//   const {
//     reset: personalReset,
//     control: personalControl,
//     handleSubmit: handlePersonalSubmit,
//     formState: { errors: personalErrors },
//     getValues: getPersonalValues
//   } = useForm({
//     defaultValues: defaultPersonalValues,
//     resolver: yupResolver(personalInfoSchema)
//   })

//   const {
//     reset: nextofKinReset,
//     control: nextOfKinControl,
//     handleSubmit: handleNextOfKinSubmit,
//     formState: { errors: nextOfKinErrors },
//     getValues: getNextOfKinValues
//   } = useForm({
//     defaultValues: defaultNextOfKinValues,
//     resolver: yupResolver(nextOfKinSchema)
//   })

//   const toggleDepartmentsModal = ()=> {
//     setOpenDepartmentsModal(!openDepartmentsModal)
//   }

//   // Handle Stepper
//   const handleBack = () => {
//     if(activeStep !== 0){
//       setActiveStep(prevActiveStep => prevActiveStep - 1)
//     }

//     return null
//   }

//   const handleForward = () => {
//     setActiveStep(prevActiveStep => prevActiveStep + 1)
//   }

//   const handleReset = () => {
//     setActiveStep(0)
//     nextofKinReset({ firstname: '', lastname: '', phone: '', email: '', occupation: '', address: '', title: '', relationship: '', maritalStatus: '',  })
//     workInfoReset({ designation: '', employeeNumber: '', rsaCompany: '',  rsaNumber: '', accountNumber: '', departmentId: '', grossSalary: '' })
//     personalReset({ username: '', email: '', firstname: '', lastname: '', password: '', phone: '', bloodGroup: '', genotype: '', allergies: '', maritalStatus: '', image: '' })
//   }

//   const handleInputImageChange = (e) => {
//     const fileInput = e.target

//     if (fileInput.files && fileInput.files.length > 0) {
//       const file = fileInput.files[0]

//       const fileSize = file.size / 1024 / 1024 // in MB

//       if (fileSize > 5) {
//         notifyWarn('FILE ERROR', 'file size cannot exceed 5Mb')

//         return
//       }

//       if (file.type.startsWith('image/')) {
//         const fileUrl = URL.createObjectURL(file)
//         setPreviewUrl(fileUrl)
//         setSelectedImage(file)
//       } else {
//         notifyWarn('FILE ERROR', 'Selected file is not an image.')
//         console.error('Selected file is not an image.')
//         setPreviewUrl(null)
//       }
//     } else {
//       notifyWarn('FILE ERROR', 'No file selected.')
//       setSelectedImage(null)
//       setPreviewUrl(null)
//     }
//   }


//   const onSubmit = () => {

//     // Retrieve form values
//     const workInfoValues = getWorkInfoValues();
//     const personalValues = getPersonalValues();
//     const nextOfKinValues = getNextOfKinValues();

//     // Do something with the values
//     console.log('Work Info Values:', workInfoValues);
//     console.log('Personal Values:', personalValues);
//     console.log('Social Values:', nextOfKinValues);

//   };



//   // Handle Password
//   const handleClickShowPassword = () => {
//     setState({ ...state, showPassword: !state.showPassword })
//   }

//   useEffect(()=>{
//     dispatch(fetchDepartments())

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   },[openDepartmentsModal])


//   const getStepContent = step => {
//     switch (step) {
//       case 0:
//         return (
//           <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
//         <Grid
//           item
//           xs={12}
//           sm={6}
//           sx={{ mb: 6, display: 'flex', flexDirection: 'row', gap: '2rem' }}
//         >
//           <Grid item xs={12} sm={6}>
//             <Box
//               sx={{
//                 border: '3px dotted black',
//                 borderRadius: 3,
//                 p: 3,
//                 display: 'flex',
//                 textAlign: 'center',
//                 alignItems: 'center',
//                 flexDirection: 'column'
//               }}
//             >
//               <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
//                 <input
//                   hidden
//                   type='file'
//                   accept='image/png, image/jpeg'
//                   onChange={handleInputImageChange}
//                   id='account-settings-upload-image'
//                 />

//                 <Icon icon='tabler:upload' fontSize='1.45rem' />
//               </ButtonStyled>
//               <Typography variant='body2' sx={{ mt: 2 }}>
//                 Upload Staff Image
//               </Typography>
//             </Box>
//           </Grid>

//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               textAlign: 'center',
//               alignItems: 'center',
//               alignSelf: 'center'
//             }}
//           >
//             <img src={`${previewUrl}`} width={120} height={100} style={{objectFit: 'cover', objectPosition: 'center'}} alt='product image' />
//           </Box>
//         </Grid>
//           <form key={1} onSubmit={handlePersonalSubmit}>
//             <Grid container spacing={5}>
//               <Grid item xs={12}>
//                 <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
//                   {steps[0].title}
//                 </Typography>
//                 <Typography variant='caption' component='p'>
//                   {steps[0].subtitle}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='firstname'
//                   control={personalControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='First Name'
//                       onChange={onChange}
//                       error={Boolean(personalErrors['first-name'])}
//                       aria-describedby='stepper-linear-personal-first-name'
//                       {...(personalErrors['first-name'] && { helperText: 'This field is required' })}
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='lastname'
//                   control={personalControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='Last Name'
//                       onChange={onChange}
//                       error={Boolean(personalErrors['lastname'])}
//                       aria-describedby='stepper-linear-personal-last-name'
//                       {...(personalErrors['lastname'] && { helperText: 'This field is required' })}
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='email'
//                   control={personalControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='Email'
//                       type='email'
//                       onChange={onChange}
//                       error={Boolean(personalErrors['email'])}
//                       aria-describedby='stepper-linear-personal-email'
//                       {...(personalErrors['email'] && { helperText: 'This field is required' })}
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='phone'
//                   control={personalControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='Phone Number'
//                       onChange={onChange}
//                       error={Boolean(personalErrors['phone'])}
//                       aria-describedby='stepper-linear-personal-phone'
//                       {...(personalErrors['phone'] && { helperText: 'This field is required' })}
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='username'
//                   control={personalControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='Username'
//                       onChange={onChange}
//                       error={Boolean(personalErrors['username'])}
//                       aria-describedby='stepper-linear-personal-username'
//                       {...(personalErrors['username'] && { helperText: 'This field is required' })}
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='password'
//                   control={personalControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='Password'
//                       onChange={onChange}
//                       id='stepper-linear-account-password'
//                       error={Boolean(personalErrors.password)}
//                       type={state.showPassword ? 'text' : 'password'}
//                       {...(personalErrors.password && { helperText: personalErrors.password.message })}
//                       InputProps={{
//                         endAdornment: (
//                           <InputAdornment position='end'>
//                             <IconButton
//                               edge='end'
//                               onClick={handleClickShowPassword}
//                               onMouseDown={e => e.preventDefault()}
//                               aria-label='toggle password visibility'
//                             >
//                               <Icon fontSize='1.25rem' icon={state.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
//                             </IconButton>
//                           </InputAdornment>
//                         )
//                       }}
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='maritalStatus'
//                   control={personalControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       select
//                       fullWidth
//                       value={value}
//                       label='Marital Status'
//                       onChange={onChange}
//                       id='stepper-linear-personal-maritalStatus'
//                       error={Boolean(personalErrors.maritalStatus)}
//                       aria-describedby='stepper-linear-personal-maritalStatus-helper'
//                       {...(personalErrors.maritalStatus && { helperText: 'This field is required' })}
//                     >
//                       <MenuItem value='Single'>Single</MenuItem>
//                       <MenuItem value='Married'>Married</MenuItem>
//                     </CustomTextField>
//                   )}
//                 />
//               </Grid>

//                <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='genotype'
//                   control={personalControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='Genotype'
//                       onChange={onChange}
//                       error={Boolean(personalErrors['genotype'])}
//                       aria-describedby='stepper-linear-personal-genotype'
//                       {...(personalErrors['genotype'] && { helperText: 'This field is required' })}
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='bloodGroup'
//                   control={personalControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='Blood Group'
//                       onChange={onChange}
//                       error={Boolean(personalErrors['bloodGroup'])}
//                       aria-describedby='stepper-linear-personal-bloodGroup'
//                       {...(personalErrors['bloodGroup'] && { helperText: 'This field is required' })}
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='allergies'
//                   control={personalControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='Allergies'
//                       onChange={onChange}
//                       error={Boolean(personalErrors['allergies'])}
//                       aria-describedby='stepper-linear-personal-allergies'
//                       {...(personalErrors['allergies'] && { helperText: 'This field is required' })}
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Button variant='tonal' color='secondary' onClick={handleBack}>
//                   Back
//                 </Button>
//                 <Button type='submit' variant='contained' onClick={handleForward}>
//                   Next
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//           </Box>
//         )
        
//       case 1:
//         return (
//           <form key={0} onSubmit={handleWorkInfoSubmit}>
//             <Grid container spacing={5}>
//               <Grid item xs={12}>
//                 <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
//                   {steps[1].title}
//                 </Typography>
//                 <Typography variant='caption' component='p'>
//                   {steps[1].subtitle}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='designation'
//                   control={workInfoControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='Designation'
//                       onChange={onChange}
//                       error={Boolean(workInfoErrors.designation)}
//                       aria-describedby='stepper-linear-account-designation'
//                       {...(workInfoErrors.designation && { helperText: 'This field is required' })}
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={5}>
//                 <Controller
//                   name='departmentId'
//                   control={workInfoControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       select
//                       fullWidth
//                       value={value}
//                       label='Department'
//                       onChange={onChange}
//                       error={Boolean(workInfoErrors.departmentId)}
//                       aria-describedby='stepper-linear-account-departmentId'
//                       {...(workInfoErrors.departmentId && { helperText: 'This field is required' })}
//                     >
//                       <MenuItem value=''>Select Department</MenuItem>
//                       { DepartmentsData?.map((department) => (
//                         <MenuItem key={department?.id} value={department?.id}>
//                           {formatFirstLetter(department?.name)}
//                         </MenuItem>
//                       ))}
//                     </CustomTextField>
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={1} sx={{ mt: 5.4 }}>
//                   <Button size='small' variant='contained' onClick={()=>toggleDepartmentsModal()}>
//                     <Icon fontSize='1.125rem' icon='tabler:plus' />
//                   </Button>
//                 </Grid>

//               <Grid item xs={12} sm={6}>
//               <Controller
//                 name='employeeNo'
//                 control={workInfoControl}
//                 rules={{ required: true }}
//                 render={({ field: { value, onChange } }) => (
//                   <CustomTextField
//                     fullWidth
//                     type='text'
//                     label='Employee Number'
//                     value={value}
//                     onChange={onChange}
//                     error={Boolean(workInfoErrors.employeeNo)}
//                     {...(workInfoErrors.employeeNo && { helperText: workInfoErrors.employeeNo.message })}
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='grossSalary'
//                   control={workInfoControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='Gross Salary'
//                       onChange={onChange}
//                       error={Boolean(workInfoErrors.grossSalary)}
//                       aria-describedby='stepper-linear-account-grossSalary'
//                       {...(workInfoErrors.grossSalary && { helperText: 'This field is required' })}
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='accountNumber'
//                   control={workInfoControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='Account Number'
//                       onChange={onChange}
//                       error={Boolean(workInfoErrors.accountNumber)}
//                       aria-describedby='stepper-linear-account-accountNumber'
//                       {...(workInfoErrors.accountNumber && { helperText: 'This field is required' })}
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='rsaCompany'
//                   control={workInfoControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='Retirement Savings Account Company'
//                       onChange={onChange}
//                       error={Boolean(workInfoErrors.rsaCompany)}
//                       aria-describedby='stepper-linear-account-rsaCompany'
//                       {...(workInfoErrors.rsaCompany && { helperText: 'This field is required' })}
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='rsaNumber'
//                   control={workInfoControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='Retirement Savings Account Number'
//                       onChange={onChange}
//                       error={Boolean(workInfoErrors.rsaNumber)}
//                       aria-describedby='stepper-linear-account-rsaNumber'
//                       {...(workInfoErrors.rsaNumber && { helperText: 'This field is required' })}
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                
//                 <Button variant='tonal' color='secondary' onClick={handleBack}>
//                   Back
//                 </Button>
//                 <Button type='submit' variant='contained' onClick={handleForward}>
//                   Next
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         )
//       case 2:
//         return (
//           <form key={2} onSubmit={handleNextOfKinSubmit(onSubmit)}>
//             <Grid container spacing={5}>
//               <Grid item xs={12}>
//                 <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
//                   {steps[2].title}
//                 </Typography>
//                 <Typography variant='caption' component='p'>
//                   {steps[2].subtitle}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='firstname'
//                   control={nextOfKinControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='First Name'
//                       onChange={onChange}
//                       error={Boolean(nextOfKinErrors.firstname)}
//                       aria-describedby='stepper-linear-social-firstname'
//                       {...(nextOfKinErrors.firstname && { helperText: nextOfKinErrors.firstname.message })}
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='lastname'
//                   control={nextOfKinControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='lastname'
//                       onChange={onChange}
//                       error={Boolean(nextOfKinErrors.lastname)}
//                       aria-describedby='stepper-linear-social-lastname'
//                       {...(nextOfKinErrors.lastname && { helperText: nextOfKinErrors.lastname.message })}
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='phone'
//                   control={nextOfKinControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='Phone Number'
//                       onChange={onChange}
//                       error={Boolean(nextOfKinErrors.phone)}
//                       aria-describedby='stepper-linear-social-phone'
//                       {...(nextOfKinErrors.phone && { helperText: nextOfKinErrors.phone.message })}
//                     />
//                   )}
//                 />
//               </Grid>
              
//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='email'
//                   control={nextOfKinControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='Email'
//                       type='email'
//                       onChange={onChange}
//                       error={Boolean(nextOfKinErrors.email)}
//                       aria-describedby='stepper-linear-social-email'
//                       {...(nextOfKinErrors.email && { helperText: nextOfKinErrors.email.message })}
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='occupation'
//                   control={nextOfKinControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='Occupation'
//                       onChange={onChange}
//                       error={Boolean(nextOfKinErrors.occupation)}
//                       aria-describedby='stepper-linear-social-occupation'
//                       {...(nextOfKinErrors.occupation && { helperText: nextOfKinErrors.occupation.message })}
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='address'
//                   control={nextOfKinControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='Address'
//                       onChange={onChange}
//                       error={Boolean(nextOfKinErrors.address)}
//                       aria-describedby='stepper-linear-social-address'
//                       {...(nextOfKinErrors.address && { helperText: nextOfKinErrors.address.message })}
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='title'
//                   control={nextOfKinControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       select
//                       fullWidth
//                       value={value}
//                       label='Title'
//                       onChange={onChange}
//                       id='stepper-linear-personal-title'
//                       error={Boolean(nextOfKinErrors.title)}
//                       aria-describedby='stepper-linear-personal-title-helper'
//                       {...(nextOfKinErrors.title && { helperText: nextOfKinErrors.title.message })}
//                     >
//                       <MenuItem value='Master'>Master</MenuItem>
//                       <MenuItem value='Mr'>Mr</MenuItem>
//                       <MenuItem value='Miss'>Miss</MenuItem>
//                       <MenuItem value='Mrs'>Mrs</MenuItem>
//                     </CustomTextField>
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='relationship'
//                   control={nextOfKinControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       fullWidth
//                       value={value}
//                       label='relationship'
//                       onChange={onChange}
//                       error={Boolean(nextOfKinErrors.relationship)}
//                       aria-describedby='stepper-linear-social-relationship'
//                       {...(nextOfKinErrors.relationship && { helperText: nextOfKinErrors.relationship.message })}
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name='maritalStatus'
//                   control={nextOfKinControl}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => (
//                     <CustomTextField
//                       select
//                       fullWidth
//                       value={value}
//                       label='Marital Status'
//                       onChange={onChange}
//                       id='stepper-linear-nextOfKin-maritalStatus'
//                       error={Boolean(nextOfKinErrors.maritalStatus)}
//                       aria-describedby='stepper-linear-nextOfKin-maritalStatus-helper'
//                       {...(nextOfKinErrors.maritalStatus && { helperText: nextOfKinErrors.maritalStatus.message })}
//                     >
//                       <MenuItem value='Single'>Single</MenuItem>
//                       <MenuItem value='Married'>Married</MenuItem>
//                     </CustomTextField>
//                   )}
//                 />
//               </Grid>


//               <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Button variant='tonal' color='secondary' onClick={handleBack}>
//                   Back
//                 </Button>
//                 <Button type='submit' variant='contained'>
//                   Submit
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         )
//       default:
//         return null
//     }
//   }

//   const renderContent = () => {
//     if (activeStep === steps.length) {
//       return (
//         <Fragment>
//           <Typography>All steps are completed!</Typography>
//           <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
//             <Button variant='contained' onClick={handleReset}>
//               Reset
//             </Button>
//           </Box>
//         </Fragment>
//       )
//     } else {
//       return getStepContent(activeStep)
//     }
//   }

//   return (
//     <Card>
//       <CardContent>
//         <StepperWrapper>
//           <Stepper activeStep={activeStep}>
//             {steps.map((step, index) => {
//               const labelProps = {}
//               if (index === activeStep) {
//                 labelProps.error = false
//                 if (
//                   (personalErrors.email ||
//                     personalErrors.username ||
//                     personalErrors.lastname ||
//                     personalErrors.firstname ||
//                     personalErrors.password  &&
//                   activeStep === 0 )
//                 ) {
//                   labelProps.error = true
//                 } else if (
//                   (workInfoErrors.designation ||
//                     workInfoErrors.departmentId ||
//                     workInfoErrors.employeeNumber ||
//                     workInfoErrors.rsaCompany ||
//                     workInfoErrors.rsaNumber ||
//                     workInfoErrors.grossSalary &&
//                   activeStep === 1 )
//                 ) {
//                   labelProps.error = true
//                 } else if (
//                   (nextOfKinErrors.google || nextOfKinErrors.lastname || nextOfKinErrors.phone || nextOfKinErrors.email) &&
//                   activeStep === 2
//                 ) {
//                   labelProps.error = true
//                 } else {
//                   labelProps.error = false
//                 }
//               }

//               return (
//                 <Step key={index}>
//                   <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
//                     <div className='step-label'>
//                       <Typography className='step-number'>{`0${index + 1}`}</Typography>
//                       <div>
//                         <Typography className='step-title'>{step.title}</Typography>
//                         <Typography className='step-subtitle'>{step.subtitle}</Typography>
//                       </div>
//                     </div>
//                   </StepLabel>
//                 </Step>
//               )
//             })}
//           </Stepper>
//         </StepperWrapper>
//       </CardContent>

//       <Divider sx={{ m: '0 !important' }} />

//       <CardContent>{renderContent()}</CardContent>

//       <CreateDepartment open={openDepartmentsModal} closeModal={toggleDepartmentsModal} />
//     </Card>
//   )
// }

// export default StepperLinearWithValidation
