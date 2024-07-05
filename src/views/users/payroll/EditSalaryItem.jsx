import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'

// ** MUI Imports
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Box,
  MenuItem,
  Typography,
  IconButton
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Icon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'
import { CustomInput } from '../duty-roster/UploadRosterDialog'

// ** Custom Component Import
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { editSalaryItemSchema } from 'src/@core/FormSchema'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const EditSalaryItem = ({ open, closeModal, selectedSalaryItem, refetch }) => {
  const {
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: selectedSalaryItem,
    mode: 'onChange',
    resolver: yupResolver(editSalaryItemSchema)
  })

  const onUpdate = async val => {
    try {
      const reqURL = `salary-items/?id=${selectedSalaryItem.id}`

      const response = await axios.patch(reqURL, val, {
        headers: { 'Content-Type': 'application/json' }
      })
      if (response.data.success) {
        notifySuccess('Salary item updated successfully')
        reset()
        refetch()
        closeModal()
      }
    } catch (error) {
      console.log(error)

      notifyError('Failed to updated salary item')
    }
  }

  useEffect(() => {
    setValue('name', selectedSalaryItem?.name)
    setValue('percentage', selectedSalaryItem?.percentage)

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth='md'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', maxWidth: 450 } }}
    >
      <DialogContent
        sx={{
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12)} !important`]
        }}
      >
        <CustomCloseButton onClick={closeModal}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </CustomCloseButton>
        <form
          //eslint-disable-next-line
          onSubmit={handleSubmit(onUpdate)}
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
            <Button type='button' variant='tonal' color='secondary' onClick={closeModal}>
              Cancel
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditSalaryItem
