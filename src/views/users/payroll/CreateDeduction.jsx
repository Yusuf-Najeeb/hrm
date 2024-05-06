import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  MenuItem,
  Typography
} from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { deductionsSchema } from 'src/@core/FormSchema'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import { CustomInput } from '../duty-roster/UploadRosterDialog'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useAppDispatch } from '../../../hooks'
import { formatDateToYYYYMM, formatFirstLetter } from '../../../@core/utils/format'
import { getPeriods } from '../../../store/apps/payroll/asyncthunk'
import { useStaffs } from '../../../hooks/useStaffs'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'

const defaultValues = {
  userId: Number(''),
  period: '',
  amount: Number(''),
  description: ''
}

const CreateDeduction = ({ openDialog, closeDialog, amountType, updateFetch }) => {
  const dispatch = useAppDispatch()
  const [periods, setPeriods] = useState([])
  const [StaffsData] = useStaffs()

  const {
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(deductionsSchema)
  })

  const createDeduction = async values => {
    try {
      const { type, period, amount, description, userId } = values
      const createUrl = `/deductions`

      const payload = { type: amountType, period, amount, description, userId }

      const resp = await axios.post(createUrl, payload, {
        headers: { 'Content-Type': 'application/json' }
      })
      if (resp.data.success) {
        notifySuccess(`${formatFirstLetter(type)} Created Successfully`)
        closeDialog()
        reset()
        updateFetch()
      }
    } catch (error) {
      notifyError(`Error Creating ${formatFirstLetter(type)}`)
      console.log(error)
    }
  }

  useEffect(() => {
    getPeriods().then(res => setPeriods(res.data.data))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>
      <Dialog open={openDialog} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 450 } }}>
        <form onSubmit={handleSubmit(createDeduction)}>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <Typography sx={{ textAlign: 'center', fontSize: '1.25rem' }}>
              Create {formatFirstLetter(amountType)}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Controller
                  name='userId'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label='Staff'
                      onChange={onChange}
                      error={Boolean(errors?.userId)}
                      aria-describedby='stepper-linear-account-userId'
                      {...(errors?.userId && { helperText: errors?.userId.message })}
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
                  name='period'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomInput
                      select
                      fullWidth
                      value={value}
                      onChange={onChange}
                      autoComplete='off'
                      label='Date'
                      error={Boolean(errors?.period)}
                      {...(errors?.period && { helperText: errors?.period.message })}
                    >
                      <MenuItem value=''>Select Period</MenuItem>
                      {periods.map(period => {
                        return (
                          <MenuItem key={period} value={period}>
                            {period}
                          </MenuItem>
                        )
                      })}
                    </CustomInput>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Controller
                  name='amount'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Amount'
                      onChange={onChange}
                      error={Boolean(errors?.amount)}
                      aria-describedby='stepper-linear-account-userId'
                      {...(errors?.amount && { helperText: errors?.amount.message })}
                    />
                  )}
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
                      rows={4}
                      label='Description'
                      onChange={onChange}
                      placeholder='Description'
                      error={Boolean(errors.description)}
                      {...(errors.description && { helperText: errors.description.message })}
                    />
                  )}
                />
              </Grid>
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
              {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Submit'}
            </Button>
            <Button type='button' variant='tonal' color='secondary' onClick={closeDialog}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  )
}

export default CreateDeduction
