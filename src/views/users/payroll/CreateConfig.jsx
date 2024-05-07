import React, { Fragment, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { deductionsSchema } from 'src/@core/FormSchema'

import CustomTextField from 'src/@core/components/mui/text-field'
import { CustomInput } from '../duty-roster/UploadRosterDialog'
import { Grid, Box, Button, Typography, CircularProgress } from '@mui/material'
import { maxWidth } from '@mui/system'

const defaultValues = {
  userId: Number(''),
  period: ''
}

const CreateConfig = () => {
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
      <form
        onSubmit={handleSubmit}
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
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
                />
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
                />
              )}
            />
          </Grid>

          {/* <Grid item xs={12} sm={12}>
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
          </Grid> */}
        </Grid>
        <Box
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button type='submit' variant='contained' sx={{ mr: 2 }}>
            {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Submit'}
          </Button>
          <Button type='button' variant='tonal' color='secondary'>
            Cancel
          </Button>
        </Box>
      </form>
    </Fragment>
  )
}

export default CreateConfig
