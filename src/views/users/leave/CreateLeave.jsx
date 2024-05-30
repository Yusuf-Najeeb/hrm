//** React Imports
import React, { Fragment, useState, useEffect } from 'react'

//** Third-Party Imports
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

//** MUI Imports
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// ** Components Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { leaveApplicationSchema } from 'src/@core/FormSchema'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import { CustomInput } from '../duty-roster/UploadRosterDialog'
import { useAppDispatch } from '../../../hooks'
import { formatFirstLetter } from '../../../@core/utils/format'
import { useStaffs } from '../../../hooks/useStaffs'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'

const defaultValues = {
  staff: Number(''),
  leaveType: '',
  start: '',
  end: '',
  reason: ''
}

const CreateLeave = ({ open, close, updateFetch }) => {
  const dispatch = useAppDispatch()
  const [periods, setPeriods] = useState([])
  const [StaffsData] = useStaffs()

  const [dates, setDates] = useState([])
  const [endDateRange, setEndDateRange] = useState(null)
  const [startDateRange, setStartDateRange] = useState(null)
  console.log(dates)

  const handleOnChangeRange = dates => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

  const {
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(leaveApplicationSchema)
  })

  return (
    <Fragment>
      <Dialog open={open} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 550 } }}>
        <form

        //  onSubmit={handleSubmit(handleDeductions)}
        >
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(8)} !important`]
            }}
          >
            <Typography sx={{ textAlign: 'left', fontSize: '1.25rem', my: 4 }}>Create Leave Application </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label='Staff'
                      onChange={onChange}
                      error={Boolean(errors?.staff)}
                      aria-describedby='stepper-linear-account-userId'
                      {...(errors?.staff && { helperText: errors?.staff.message })}
                    >
                      <MenuItem value=''>Select Staff</MenuItem>
                      {StaffsData?.map(staff => (
                        <MenuItem key={staff?.id} value={staff?.id}>
                          {` ${formatFirstLetter(staff?.firstname)} ${formatFirstLetter(staff?.lastname)} `}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Controller
                  name='leaveType'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomInput
                      select
                      fullWidth
                      value={value}
                      onChange={onChange}
                      autoComplete='on'
                      label='Leave Type'
                      error={Boolean(errors?.leaveType)}
                      {...(errors?.leaveType && { helperText: errors?.leaveType.message })}
                    >
                      <MenuItem value=''>Select Leave Type</MenuItem>
                      <MenuItem value='Casual Leave'>Casual Leave</MenuItem>
                      <MenuItem value='Sick Leave'>Sick Leave</MenuItem>
                      <MenuItem value='Religious Holiday'>Religious Holiday</MenuItem>
                      <MenuItem value='Maternity Leave'>Maternity Leave</MenuItem>
                      <MenuItem value='Paternity Leave'>Paternity Leave</MenuItem>
                      <MenuItem value='Bereavement Leave'>Bereavement Leave</MenuItem>
                      <MenuItem value='Compensatory Leave'>Compensatory Leave</MenuItem>
                      <MenuItem value='Study Leave'>Study Leave</MenuItem>
                      <MenuItem value='Examination Leave'>Examination Leave</MenuItem>
                      <MenuItem value='Annual Leave'>Annual Leave</MenuItem>
                      <MenuItem value='Others'>Others</MenuItem>
                      {/* {periods.map(period => {
                        return (
                          <MenuItem key={period} value={period}>
                            {period}
                          </MenuItem>
                        )
                      })} */}
                    </CustomInput>
                  )}
                />
              </Grid>

              {/* <Grid item xs={12} sm={12}>
                <Controller
                  name='start'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Start Date'
                      onChange={onChange}
                      error={Boolean(errors?.amount)}
                      aria-describedby='stepper-linear-account-userId'
                      {...(errors?.amount && { helperText: errors?.amount.message })}
                    />
                  )}
                />
              </Grid> */}
              <Grid item xs={12} sm={12}>
                <DatePicker
                  isClearable
                  selectsRange
                  monthsShown={2}
                  endDate={endDateRange}
                  selected={startDateRange}
                  startDate={startDateRange}
                  shouldCloseOnSelect={false}
                  id='date-range-picker-months'
                  onChange={handleOnChangeRange}
                  customInput={
                    <CustomInput
                      dates={dates}
                      setDates={setDates}
                      label='Starts - Ends'
                      end={endDateRange}
                      start={startDateRange}
                    />
                  }
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Controller
                  name='reason'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      multiline
                      rows={4}
                      label='Reason for leave'
                      onChange={onChange}
                      placeholder='Reason for leave'
                      error={Boolean(errors.reason)}
                      {...(errors.reason && { helperText: errors.reason.message })}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button type='submit' variant='contained' sx={{ mr: 2 }}>
              {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Create'}
            </Button>
            <Button type='button' variant='tonal' color='secondary' onClick={close}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  )
}

export default CreateLeave
