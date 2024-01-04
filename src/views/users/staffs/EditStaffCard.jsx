import React, { forwardRef, useEffect, useState } from 'react'


import 'react-datepicker/dist/react-datepicker.css'


// MUI
import DatePicker from 'react-datepicker'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from 'src/@core/components/mui/text-field'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import { CircularProgress } from '@mui/material'
import DialogContentText from '@mui/material/DialogContentText'

// React hook form / yup
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// Others
import axios from 'axios'
import moment from 'moment'
import Icon from 'src/@core/components/icon'
import { uploadStaffImage } from 'src/store/apps/staffs/asyncthunk'
import { notifyWarn } from '../../../@core/components/toasts/notifyWarn'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'


const defaultValues = {
  fullname: '',
  join_date: null,
  leave_date: null,
  roleId: '',
  username: '',
  email: '',
  salary: Number(''),
  idNo: '',
  phone: '',

  // image: '',
  designationId: ''
}

const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }))

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const EditStaffCard = ({ openEdit, handleEditClose, data, setHasUploadedImage, setProfilePictureUrl }) => {
  const [allRoles, setAllRoles] = useState([])
  const [allDesc, setAllDesc] = useState([])
  const [previewUrl, setPreviewUrl] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageLinkPayload, setImageLinkPayload] = useState(null)

  const {
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver()
  })


  useEffect(() => {
    if (data) {
      setValue('fullname', data.firstname)
      setValue('username', data.username)
      setValue('email', data.email)
      setValue('phone', data.phone)

      // setValue('designationId', data.designationId)
      // setValue('idNo', data.idNo)
      // setValue('salary', data.salary)
      // setValue('roleId', data.roleId)
      // setValue('join_date', new Date(data.joinDate))
      // setValue('leave_date', new Date(data.leaveDate))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleInputImageChange = (e) => {
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
        const formData = new FormData();
        formData.append("picture", file);
        uploadStaffImage(formData).then((res)=> {
          setImageLinkPayload(res.url)
          setPreviewUrl(fileUrl)
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

  const onUpdateForm = async (values) => {
    try {
      const createUrl = `user/${data.id}`

      const resp = await axios.put(
        createUrl,
        {
          ...values,
          image: imageLinkPayload ? imageLinkPayload : "",
          username: undefined,
          join_date: moment(values.join_date).format('YYYY-MM-DD'),
          leave_date: values.leave_date ? moment(values.leave_date).format('YYYY-MM-DD') : ''
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )

      if (resp.data.success) {
        setHasUploadedImage(true)
        setProfilePictureUrl(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${resp.data.data?.image}`)
        notifySuccess('Staff updated Successfully')
        handleEditClose()
        reset()
      }
    } catch (error) {
      notifyError('error updating Staff')
    }
  }

  return (
    <Dialog
      open={openEdit}

      // onClose={handleEditClose}
      aria-labelledby='user-view-edit'
      aria-describedby='user-view-edit-description'
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 850 } }}
    >
      <DialogTitle
        id='user-view-edit'
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        Edit User Information
      </DialogTitle>
      <form onSubmit={handleSubmit(onUpdateForm)}>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
            Updating user details will not reset password.
          </DialogContentText>

          <Grid
          item
          xs={12}
          sm={6}
          sx={{ mb: 6, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                border: '3px dotted black',
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

                  //   value={inputValue}
                  accept='image/png, image/jpeg'
                  onChange={handleInputImageChange}
                  id='account-settings-upload-image'
                />

                <Icon icon='tabler:upload' fontSize='1.75rem' />
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
            {previewUrl && <img src={`${previewUrl}`} width={100} height={100} style={{objectFit: 'cover', objectPosition: 'center'}} alt='staff image' /> }
          </Box>
        </Grid>

          <Grid container spacing={6}>

            <Grid item xs={12} sm={6}>
              <Controller
                name='fullname'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    label='Full Name'
                    placeholder='John Doe'
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.fullname)}
                    {...(errors.fullname && { helperText: errors.fullname.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='username'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    label='Username'
                    placeholder='John.Doe'
                    value={value}
                    onChange={onChange}
                    disabled
                    error={Boolean(errors.username)}
                    {...(errors.username && { helperText: errors.username.message })}
                    InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    type='email'
                    label='Email'
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder='johndoe@email.com'
                    {...(errors.email && { helperText: errors.email.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='roleId'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Role'
                    value={value}
                    onChange={e => {
                      setValue('roleId', e.target.value)
                    }}
                    error={Boolean(errors.roleId)}
                    {...(errors.roleId && { helperText: errors.roleId.message })}
                  >
                    <MenuItem value=''>Select role</MenuItem>
                    {allRoles.map(role => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='phone'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    type='text'
                    label='Contact'
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.phone)}
                    placeholder='+234'
                    {...(errors.phone && { helperText: errors.phone.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='idNo'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    type='text'
                    label='ID NO'
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.idNo)}
                    placeholder='UID-8894'
                    {...(errors.idNo && { helperText: errors.idNo.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='designationId'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Designation'
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.designationId)}
                    {...(errors.designationId && { helperText: errors.designationId.message })}
                  >
                    <MenuItem value=''>Select Designation</MenuItem>
                    {allDesc.map(item => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name='salary'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    type='text'
                    label='Salary'
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.salary)}
                    placeholder={String(3000)}
                    {...(errors.salary && { helperText: errors.salary.message })}
                  />
                )}
              />
            </Grid>
            
            {/* <Grid item xs={12} sm={6}>
              <Controller
                name='join_date'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    selected={value}
                    popperPlacement='bottom-end'
                    showYearDropdown
                    showMonthDropdown
                    onChange={e => onChange(e)}
                    placeholderText='MM/DD/YYYY'
                    customInput={
                      <CustomInput
                        value={value}
                        onChange={onChange}
                        label='Join Date'
                        error={Boolean(errors.join_date)}
                        {...(errors.join_date && { helperText: 'Joined Date is required' })}
                      />
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='leave_date'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    selected={value}
                    popperPlacement='bottom-end'
                    showYearDropdown
                    showMonthDropdown
                    onChange={e => onChange(e)}
                    placeholderText='MM/DD/YYYY'
                    customInput={
                      <CustomInput
                        value={value}
                        onChange={onChange}
                        label='Leave Date'
                        error={Boolean(errors.leave_date)}
                        {...(errors.leave_date && { helperText: 'Date is required' })}
                      />
                    }
                  />
                )}
              />
            </Grid> */}
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button type='submit' variant='contained' sx={{ mr: 2 }}>
            {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} />}
            Submit
          </Button>
          <Button type='button' variant='tonal' color='secondary' onClick={handleEditClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditStaffCard
