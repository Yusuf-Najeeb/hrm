// ** React Imports
import { forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
import CustomTextField from 'src/@core/components/mui/text-field'

import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'

import IconButton from '@mui/material/IconButton'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { CircularProgress } from '@mui/material'

// ** React Hook Form and Yup Imports
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { requireReason } from 'src/@core/Formschema'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import axios from 'axios'

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

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const defaultValues = {
  reason: ''
}

const DeleteStaff = ({ open, handleClose, selectedStaff, refetchStaffs }) => {
  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(requireReason) })

  const onDeleteClick = async payload => {
    try {
      const { data } = await axios({
        method: 'delete',
        url: `users?id=${selectedStaff}`,
        data: payload
      })

      if (data.success) {
        notifySuccess('Staff Deactivated')
        reset()
        refetchStaffs()
        handleClose()
      }
    } catch (error) {
      notifyError('Error deleting staff')
    }
  }

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth='sm'
      scroll='body'
      onClose={handleClose}
      onBackdropClick={handleClose}
      TransitionComponent={Transition}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <CustomCloseButton onClick={handleClose}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </CustomCloseButton>

        <form onSubmit={handleSubmit(onDeleteClick)}>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`
            }}
          >
            <Grid container spacing={6}>
              <Grid item xs={12} sm={12}>
                <Controller
                  name='reason'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='Reason'
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.reason)}
                      {...(errors.reason && { helperText: errors.reason.message })}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button type='submit' variant='contained'>
              {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Delete'}
            </Button>
          </Box>
        </form>
      </DialogContent>

      {/* <DialogActions
        sx={{
          justifyContent: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Button variant='contained' sx={{ mr: 1 }} onClick={()=> setShowForm(!showForm)}>
          Yes, delete it
        </Button>
        <Button variant='tonal' color='secondary' onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions> */}
    </Dialog>
  )
}

export default DeleteStaff
