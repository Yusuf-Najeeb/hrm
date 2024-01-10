// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { Box, Button, CircularProgress, Grid, MenuItem, Popover } from '@mui/material'
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

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const defaultValues = {
  rosterDate: null,
  departmentId: ''
}

const DownloadTemplateDialog = ({ open, anchorEl, handleClose }) => {
  const [DepartmentsData] = useDepartments()
  const dispatch = useAppDispatch()
  const [startDate, setStartDate] = useState(new Date())
  const [isTemplateAvailable, setTemplateAvailability] = useState(false)
  const [rosterTemplateRes, setDownloadRes] = useState()

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

  const downloadTemplate = async (values) => {
    const period = formatDateToYYYYMM(values.rosterDate)

    try {
      const { data } = await axios.get(`/roster/download/template?period=${period}&departmentId=${values.departmentId}`)

      if (data) {
        setDownloadRes(data.data.url)
        setTemplateAvailability(!isTemplateAvailable)
        notifySuccess('Download Successful')
        closeDialog()
      }
    } catch (error) {
      if(error.response.data.message.includes('No staff')){

        notifyError('No Staffs in selected department')
      }
      else{
        notifyError("Download failed")
      }
    }
  }

  useEffect(() => {
    dispatch(fetchDepartments({ page: 1, limit: 200 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
    if ( isTemplateAvailable) {
      window.location.href = rosterTemplateRes  
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTemplateAvailable])

  return (
    <Popover
      id='download-popover'
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
    >
      <form onSubmit={handleSubmit(downloadTemplate)}>
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

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='tonal' onClick={closeDialog} startIcon={<Icon icon='mdi:arrow-left-bold' />}>
              Close
            </Button>
            <Button type='submit' variant='contained' color='success'>
              {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ mx: 2 }} />}
              Download
            </Button>
          </Grid>
        </Grid>
      </form>
    </Popover>
  )
}

export default DownloadTemplateDialog
