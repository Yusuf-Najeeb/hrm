import React, { Fragment, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { configSchema } from 'src/@core/FormSchema'

import CustomTextField from 'src/@core/components/mui/text-field'
import { CustomInput } from '../duty-roster/UploadRosterDialog'
import { Grid, Box, Button, Typography, CircularProgress } from '@mui/material'

const defaultValues = {
  name: '',
  percent: ''
}

const CreateConfig = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(configSchema)
  })

  const onSubmit = val => {
    console.log(val)
  }

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12}>
            <Controller
              name='name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  label='Name'
                  Placeholder='Item Name'
                  onChange={onChange}
                  error={Boolean(errors?.name)}
                  aria-describedby='stepper-linear-account-userId'
                  {...(errors?.name && { helperText: errors?.name.message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name='percent'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomInput
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label='Percentage %'
                  Placeholder='Percentage'
                  error={Boolean(errors?.percent)}
                  {...(errors?.percent && { helperText: errors?.percent.message })}
                />
              )}
            />
          </Grid>
        </Grid>

        <Box sx={{ my: 5, display: 'flex', justifyContent: 'center', gap: 5 }}>
          <Button type='submit' variant='contained'>
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
