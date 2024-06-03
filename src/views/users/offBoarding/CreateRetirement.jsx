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
import { retirementSchema } from 'src/@core/FormSchema'
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
  date: '',
  issuerName: '',
  comment: ''
}

const CreateRetiree = ({ open, close, updateFetch }) => {
  const dispatch = useAppDispatch()
  const [StaffsData] = useStaffs()

  const [dates, setDates] = useState([])

  const {
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(retirementSchema)
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
            <Typography sx={{ textAlign: 'left', fontSize: '1.25rem', my: 4 }}>Retirement</Typography>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={12}>
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

              <Grid item xs={12} sm={12}>
                <Controller
                  name='issuerName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Issuer Name'
                      onChange={onChange}
                      error={Boolean(errors?.issuerName)}
                      aria-describedby='stepper-linear-account-userId'
                      {...(errors?.issuerName && { helperText: errors?.issuerName.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Controller
                  name='date'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selected={value}
                      dateFormat='yyyy-MM-dd'
                      popperPlacement='bottom-end'
                      maxDate={new Date()}
                      onChange={e => {
                        onChange(e)
                      }}
                      placeholderText='YYYY-MM-DD'
                      customInput={
                        <CustomInput
                          value={value}
                          onChange={onChange}
                          autoComplete='off'
                          label='Date'
                          error={Boolean(errors?.date)}
                          {...(errors?.date && { helperText: errors?.date.message })}
                        />
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Controller
                  name='comment'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      multiline
                      rows={4}
                      label='Comment'
                      onChange={onChange}
                      placeholder='Drop a comment'
                      error={Boolean(errors.comment)}
                      {...(errors.comment && { helperText: errors.comment.message })}
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
              {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Save'}
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

export default CreateRetiree
