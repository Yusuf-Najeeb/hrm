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
import { querySchema } from 'src/@core/FormSchema'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import { CustomInput } from '../duty-roster/UploadRosterDialog'
import { useAppDispatch } from '../../../hooks'
import { formatFirstLetter } from '../../../@core/utils/format'
import { useStaffs } from '../../../hooks/useStaffs'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'

const defaultValues = {
  title: '',
  customer: '',
  amountReceived: '',
  date: '',
  discount: '',
  paymentType: '',
  creditAccount: '',
  debitAccount: '',
  description: '',
}

const NewInflow = ({ open, close, updateFetch }) => {
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
    resolver: yupResolver(querySchema)
  })

  return (
    <Fragment>
      <Dialog open={open} sx={{ '& .MuiPaper-root': { width: '100%', minWidth: 850 } }}>
        <form

        //  onSubmit={handleSubmit(handleDeductions)}
        >
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(8)} !important`]
            }}
          >
            <Typography sx={{ textAlign: 'left', fontSize: '1.25rem', my: 4 }}>New Inflow</Typography>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='title'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Title'
                      onChange={onChange}
                      error={Boolean(errors?.title)}
                      aria-describedby='stepper-linear-account-userId'
                      {...(errors?.title && { helperText: errors?.title.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='customer'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label='Customer'
                      onChange={onChange}
                      error={Boolean(errors?.customer)}
                      aria-describedby='stepper-linear-account-userId'
                      {...(errors?.customer && { helperText: errors?.customer.message })}
                    >
                      <MenuItem value=''>Select Customer</MenuItem>
                      {StaffsData?.map(staff => (
                        <MenuItem key={staff?.id} value={staff?.id}>
                          {` ${formatFirstLetter(staff?.firstname)} ${formatFirstLetter(staff?.lastname)} `}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='date'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selected={value}
                      dateFormat='yyyy-MM-dd'
                      popperPlacement='bottom-end'
                      onChange={e => {
                        onChange(e)
                      }}
                      placeholderText='YYYY-MM-DD'
                      customInput={
                        <CustomInput
                          value={value}
                          onChange={onChange}
                          label='Date'
                          error={Boolean(errors?.date)}
                          {...(errors?.date && { helperText: errors?.date.message })}
                        />
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='amountReceived'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Amount Received'
                      onChange={onChange}
                      error={Boolean(errors?.amountReceived)}
                      aria-describedby='stepper-linear-account-userId'
                      {...(errors?.amountReceived && { helperText: errors?.amountReceived.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='discount'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Discount'
                      onChange={onChange}
                      error={Boolean(errors?.discount)}
                      aria-describedby='stepper-linear-account-userId'
                      {...(errors?.discount && { helperText: errors?.discount.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='paymentType'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomInput
                      select
                      fullWidth
                      value={value}
                      onChange={onChange}
                      label='Payment Type'
                      error={Boolean(errors?.paymentType)}
                      {...(errors?.paymentType && { helperText: errors?.paymentType.message })}
                    >
                      <MenuItem value=''>Select Debit Account</MenuItem>

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

              <Grid item xs={12} sm={6}>
                <Controller
                  name='creditAccount'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomInput
                      select
                      fullWidth
                      value={value}
                      onChange={onChange}
                      label='Credit Account'
                      error={Boolean(errors?.creditAccount)}
                      {...(errors?.creditAccount && { helperText: errors?.creditAccount.message })}
                    >
                      <MenuItem value=''>Select Credit Account</MenuItem>

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

              <Grid item xs={12} sm={6}>
                <Controller
                  name='debitAccount'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomInput
                      select
                      fullWidth
                      value={value}
                      onChange={onChange}
                      label='Debit Account'
                      error={Boolean(errors?.debitAccount)}
                      {...(errors?.debitAccount && { helperText: errors?.debitAccount.message })}
                    >
                      <MenuItem value=''>Select Debit Account</MenuItem>

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
                      placeholder='Payment description'
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
              justifyContent: 'end',
              pl: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button type='button' variant='tonal' color='secondary' onClick={close}>
              Cancel
            </Button>
            <Button type='submit' variant='contained' sx={{ mr: 2 }}>
              {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  )
}

export default NewInflow
