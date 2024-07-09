//** React Imports
import React, { Fragment, useState, useContext, useEffect } from 'react'
import ModalContext from './ModalContext'

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
import { leaveApplicationSchema } from 'src/@core/FormSchema'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import { CustomInput } from '../duty-roster/UploadRosterDialog'
import { useAppDispatch } from '../../../hooks'
import { formatFirstLetter } from '../../../@core/utils/format'
import { useStaffs } from '../../../hooks/useStaffs'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'

const defaultValues = {
  name: '',
  costPrice: '',
  sellingPrice: '',
  quantity: '',
  lowStock: ''
}

const CreateLeave = () => {
  const { createProductModalOpen, setCreateProductModalOpen } = useContext(ModalContext)

  const closeProductCreateModal = () => {
    setCreateProductModalOpen(false)
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
    resolver: yupResolver(leaveApplicationSchema)
  })

  return (
    <Fragment>
      <Dialog open={createProductModalOpen} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 550 } }}>
        <form>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(8)} !important`]
            }}
          >
            <Typography sx={{ textAlign: 'left', fontSize: '1.25rem', my: 4 }}>Create Product</Typography>

            <Grid container spacing={8}>
              <Grid item xs={12} sm={12}>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomInput
                      fullWidth
                      value={value}
                      label='Name'
                      onChange={onChange}
                      error={Boolean(errors?.name)}
                      {...(errors?.name && { helperText: errors?.name.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  name='costPrice'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomInput
                      fullWidth
                      value={value}
                      onChange={onChange}
                      label='Cost Price'
                      error={Boolean(errors?.costPrice)}
                      {...(errors?.costPrice && { helperText: errors?.costPrice.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  name='sellingPrice'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomInput
                      fullWidth
                      value={value}
                      onChange={onChange}
                      label='Selling Price'
                      error={Boolean(errors?.sellingPrice)}
                      {...(errors?.sellingPrice && { helperText: errors?.sellingPrice.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  name='quantity'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomInput
                      fullWidth
                      value={value}
                      onChange={onChange}
                      label='Quantity'
                      error={Boolean(errors?.quantity)}
                      {...(errors?.quantity && { helperText: errors?.quantity.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  name='lowStock'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Low Stock'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.lowStock)}
                      {...(errors.lowStock && { helperText: errors.lowStock.message })}
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
            <Button type='button' variant='tonal' color='secondary' onClick={closeProductCreateModal}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  )
}

export default CreateLeave
