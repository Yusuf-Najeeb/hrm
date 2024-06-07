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
import { suspensionSchema } from 'src/@core/FormSchema'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import { CustomInput } from '../duty-roster/UploadRosterDialog'
import { useAppDispatch } from '../../../hooks'
import { formatFirstLetter } from '../../../@core/utils/format'
import { useStaffs } from '../../../hooks/useStaffs'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import FileUploaderMultiple from 'src/views/forms/form-elements/file-uploader/FileUploaderMultiple'

const defaultValues = {
  task: '',
  staff: Number(''),
  issuerName: '',
  suspensionType: '',
  description: '',
  start: '',
  end: ''
}

const CreateTodo = ({ open, close, updateFetch }) => {
  const dispatch = useAppDispatch()
  const [StaffsData] = useStaffs()
  const [dates, setDates] = useState([])
  const [endDateRange, setEndDateRange] = useState(null)
  const [startDateRange, setStartDateRange] = useState(null)

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
    resolver: yupResolver(suspensionSchema)
  })

  return (
    <Fragment>
      <Dialog open={open} sx={{ '& .MuiPaper-root': { width: '100%', minWidth: 950 } }}>
        <form

        //  onSubmit={handleSubmit(handleDeductions)}
        >
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(8)} !important`]
            }}
          >
            <Typography sx={{ textAlign: 'left', fontSize: '1.25rem', my: 4 }}>New Task</Typography>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='task'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Task'
                      onChange={onChange}
                      error={Boolean(errors?.task)}
                      aria-describedby='stepper-linear-account-userId'
                      {...(errors?.task && { helperText: errors?.task.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='staff'
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

              <Grid item xs={12} sm={4}>
                <Controller
                  name='priority'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label='Priority'
                      onChange={onChange}
                      error={Boolean(errors?.priority)}
                      aria-describedby='stepper-linear-account-userId'
                      {...(errors?.priority && { helperText: errors?.priority.message })}
                    >
                      <MenuItem value=''>Select Priority</MenuItem>
                      <MenuItem value='Urgent'>Urgent</MenuItem>
                      <MenuItem value='High'>High</MenuItem>
                      <MenuItem value='Medium'>Medium</MenuItem>
                      <MenuItem value='Low'>Low</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name='status'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomInput
                      select
                      fullWidth
                      value={value}
                      onChange={onChange}
                      label='Status'
                      error={Boolean(errors?.status)}
                      {...(errors?.status && { helperText: errors?.status.message })}
                    >
                      <MenuItem value=''>Select Status</MenuItem>
                      <MenuItem value='Doing'>Doing</MenuItem>
                      <MenuItem value='Done'>Done</MenuItem>
                      <MenuItem value='Closed'>Closed</MenuItem>
                      <MenuItem value='Pending'>Pending</MenuItem>
                    </CustomInput>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name='estimated_time'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Estimated Time'
                      onChange={onChange}
                      error={Boolean(errors?.estimated_time)}
                      aria-describedby='stepper-linear-account-userId'
                      {...(errors?.estimated_time && { helperText: errors?.estimated_time.message })}
                    />
                  )}
                />
              </Grid>

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
                  name='description'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      multiline
                      rows={8}
                      label='Description'
                      onChange={onChange}
                      placeholder='Task Description'
                      error={Boolean(errors.description)}
                      {...(errors.description && { helperText: errors.description.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FileUploaderMultiple />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'end',
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

export default CreateTodo
