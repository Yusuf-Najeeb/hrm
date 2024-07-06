//** React Imports
import React, { Fragment, useState, useEffect } from 'react'

//** Icon Imports
import Icon from 'src/@core/components/icon'

//** MUI Imports
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// ** Components Imports
import { requireName } from 'src/@core/FormSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles'
import CustomTextField from 'src/@core/components/mui/text-field'
import { useAppDispatch } from '../../../hooks'
import { useStaffs } from '../../../hooks/useStaffs'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'

const defaultValues = {
  name: ''
}

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

const NewDepartment = ({ open, close, updateFetch }) => {
  const dispatch = useAppDispatch()
  const [StaffsData] = useStaffs()

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(requireName)
  })

  const onSubmit = () => {
    console.log('What is happening?')
  }

  return (
    <Fragment>
      <Dialog
        fullWidth
        open={open}
        maxWidth='sm'
        scroll='body'
        sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', maxWidth: 450 } }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent
            sx={{
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12)} !important`]
            }}
          >
            <CustomCloseButton onClick={close}>
              <Icon icon='tabler:x' fontSize='1.25rem' />
            </CustomCloseButton>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={12}>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='Department Name'
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.name)}
                      {...(errors.name && { helperText: errors.name.message })}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <Button type='submit' variant='contained' sx={{ mr: 2 }}>
              {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  )
}

export default NewDepartment
