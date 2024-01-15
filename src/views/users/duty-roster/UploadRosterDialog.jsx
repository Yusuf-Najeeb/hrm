// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { Box, Button, CircularProgress, Grid, MenuItem, Popover, Typography } from '@mui/material'
import DatePicker from 'react-datepicker'

// Custom Hooks
import { useDepartments } from '../../../hooks/useDepartments'
import { useAppDispatch } from '../../../hooks'

// Third Party/Schema Imports
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { downloadRosterSchema } from 'src/@core/Formschema'

import { fetchDepartments } from '../../../store/apps/departments/asyncthunk'
import { formatDateToYYYYMM, formatFirstLetter } from '../../../@core/utils/format'
import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { notifyWarn } from 'src/@core/components/toasts/notifyWarn'

export const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const defaultValues = {
  rosterDate: null,
  departmentId: ''
}

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const UploadRosterDialog = ({ open, anchorEl, handleClose }) => {
  const [DepartmentsData] = useDepartments()
  const dispatch = useAppDispatch()
  const [startDate, setStartDate] = useState(new Date())
  const [isTemplateAvailable, setTemplateAvailability] = useState(false)
  const [rosterTemplateRes, setDownloadRes] = useState()
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileName, setFileName] = useState(null)

  // ** States

  const {
    reset,
    setValue,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues,
    resolver: yupResolver(downloadRosterSchema)
  })

  const closeDialog = () => {
    handleClose()
    reset()
  }

  const handleFileChange = async (e) => {
    const fileInput = e.target

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0]
      setFileName(file.name)
      setSelectedFile(file)

      const fileSize = file.size / 1024 / 1024 // in MB

      if (fileSize > 10) {
        notifyWarn('FILE ERROR', 'File size should not exceed 10MB.');
        setSelectedFile(null);
      }

    } else {
      notifyWarn('FILE ERROR', 'No file selected.')
      setSelectedFile(null)
    }
  }



  const handleSubmitFile = async (values)=>{
   
    const period = formatDateToYYYYMM(values.rosterDate)

    const formData = new FormData()
    formData.append('file', selectedFile)

      try {
        const response = await axios.post(`roster?departmentId=${values.departmentId}&period=${period}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data;'
          }
        })
  
        if (response) {
          notifySuccess('File Upload successful')
          closeDialog()

          // setUploadStatus(!hasUploadedProducts)
        }
      } catch (error) {
        notifyError(error?.response ? error?.response.data.message :'File upload failed, try again')
      }

    
  }

  useEffect(() => {
    dispatch(fetchDepartments({ page: 1, limit: 200 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

 

  return (
    <Popover
      id='upload-popover'
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
    >
      <form onSubmit={handleSubmit(handleSubmitFile)}>
        <Grid container spacing={5} sx={{ p: '2rem', width: '310px' }}>
          <Grid item xs={12} sm={12}>
            <Controller
              name='rosterDate'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  selected={value}
                  dateFormat='MMM y'
                  popperPlacement='bottom-end'
                  showMonthYearPicker
                  minDate={new Date()}
                  onChange={e => {
                    onChange(e)
                  }}
                  placeholderText='MM/YYYY'
                  customInput={
                    <CustomInput
                      value={value}
                      onChange={onChange}
                      autoComplete='off'
                      label='Date'
                      error={Boolean(errors.rosterDate)}
                      {...(errors.rosterDate && { helperText: 'Date is required' })}
                    />
                  }
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name='departmentId'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  value={value}
                  label='Department'
                  onChange={onChange}
                  error={Boolean(errors.departmentId)}
                  aria-describedby='stepper-linear-account-departmentId'
                  {...(errors.departmentId && { helperText: errors.departmentId.message })}
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

          <Grid
          item
          xs={12}
          sm={6}
          sx={{ mb: 6, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <Grid item xs={12} sm={12}>
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
              <ButtonStyled component='label' variant='contained' htmlFor='upload-excel-file'>
                <input
                  hidden
                  type='file'
                  accept='.xls, .xlsx'
                  onChange={handleFileChange}
                  id='upload-excel-file'
                />

                <Icon icon='tabler:upload' fontSize='0.85rem' />
              </ButtonStyled>
              <Typography variant='body2' sx={{ mt: 2 }}>
                Upload File
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              alignItems: 'center',
              alignSelf: 'center'
            }}
          >
            <Typography variant='body2'>{fileName}</Typography>
          </Box>
          </Grid>

        </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='tonal' onClick={closeDialog} startIcon={<Icon icon='mdi:arrow-left-bold' />}>
              Close
            </Button>
            <Button type='submit' variant='contained' color='success'>
              {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ mx: 2 }} />}
              Upload
            </Button>
          </Grid>
        </Grid>
      </form>
    </Popover>
  )
}

export default UploadRosterDialog
