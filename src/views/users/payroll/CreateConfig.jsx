import React, { Fragment, useState } from 'react'
import axios from 'axios'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { salaryItemSchema } from 'src/@core/FormSchema'
import { CustomInput } from '../duty-roster/UploadRosterDialog'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'

import CustomTextField from 'src/@core/components/mui/text-field'
import { Grid, Box, Button, CircularProgress } from '@mui/material'

const defaultValues = {
  name: '',
  percentage: ''
}

const CreateConfig = ({ refetch }) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(salaryItemSchema)
  })

  const createItem = async val => {
    try {
      const createUrl = `/salary-items`

      const response = await axios.post(createUrl, val, {
        headers: { 'Content-Type': 'application/json' }
      })
      if (response.data.success) {
        notifySuccess(`Salary item Created Successfully`)
        reset()
        refetch()
      }
    } catch (error) {
      notifyError(`Error Creating salary item`)
      console.log(error)
    }
  }

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(createItem)}
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
              name='percentage'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomInput
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label='Percentage'
                  Placeholder='Percentage'
                  error={Boolean(errors?.percentage)}
                  {...(errors?.percentage && { helperText: errors?.percentage.message })}
                />
              )}
            />
          </Grid>
        </Grid>

        <Box sx={{ my: 5, display: 'flex', justifyContent: 'center', gap: 5 }}>
          <Button type='submit' variant='contained'>
            {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Submit'}
          </Button>
          <Button type='button' variant='tonal' color='secondary' onClick={reset}>
            Cancel
          </Button>
        </Box>
      </form>
    </Fragment>
  )
}

export default CreateConfig
