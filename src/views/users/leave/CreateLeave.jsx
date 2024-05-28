//** React Imports
import React, { Fragment, useState, useEffect } from 'react'

//** Axios Import
import axios from 'axios'

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
import { deductionsSchema } from 'src/@core/FormSchema'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import { CustomInput } from '../duty-roster/UploadRosterDialog'
import { useAppDispatch } from '../../../hooks'
import { formatFirstLetter } from '../../../@core/utils/format'
import { useStaffs } from '../../../hooks/useStaffs'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'

const defaultValues = {
  userId: Number(''),
  period: '',
  amount: Number(''),
  description: '',
  type: ''
}

const CreateLeave = ({ open, close, updateFetch }) => {
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
