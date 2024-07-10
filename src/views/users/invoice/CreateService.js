//** React Imports
import React, { Fragment, useContext } from 'react'
import ModalContext from './ModalContext'

//** Third-Party Imports

//** MUI Imports
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Components Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { leaveApplicationSchema } from 'src/@core/FormSchema'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import { CustomInput } from '../duty-roster/UploadRosterDialog'

const defaultValues = {
  name: '',
  price: '',
  description: ''
}

const CreateLeave = () => {
  const { createServiceModalOpen, setCreateServiceModalOpen } = useContext(ModalContext)

  const closeServiceCreateModal = () => {
    setCreateServiceModalOpen(false)
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
      <Dialog open={createServiceModalOpen} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 550 } }}>
        <form>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(8)} !important`]
            }}
          >
            <Typography sx={{ textAlign: 'left', fontSize: '1.25rem', my: 4 }}>Create Service</Typography>

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
                  name='price'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomInput
                      fullWidth
                      value={value}
                      onChange={onChange}
                      label='Price'
                      error={Boolean(errors?.price)}
                      {...(errors?.price && { helperText: errors?.price.message })}
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
                    <CustomInput
                      fullWidth
                      multiline
                      rows={4}
                      value={value}
                      onChange={onChange}
                      label='Description'
                      error={Boolean(errors?.description)}
                      {...(errors?.description && { helperText: errors?.description.message })}
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
            <Button type='button' variant='tonal' color='secondary' onClick={closeServiceCreateModal}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  )
}

export default CreateLeave
