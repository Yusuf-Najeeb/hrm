// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { styled } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

// ** Hooks Import
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { requireName } from 'src/@core/Formschema'
import { useAppDispatch } from '../../../hooks'
import { createDepartment } from '../../../store/apps/departments/asyncthunk'

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

const defaultValues = {
  name: ''
}

const CreateDepartment = ({ open, closeModal }) => {
  const dispatch = useAppDispatch()

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(requireName) })

  const handleCreate = async data => {
    dispatch(createDepartment(data))
    reset()
    closeModal()
  }

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth='sm'
      onClose={closeModal}
      onBackdropClick={closeModal}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <CustomCloseButton onClick={closeModal}>
        <Icon icon='tabler:x' fontSize='1.25rem' />
      </CustomCloseButton>
      <DialogContent>
        <Typography sx={{ my: '1rem', textAlign: 'center', fontSize: '1.2rem' }}>Create Department</Typography>

        <form onSubmit={handleSubmit(data => handleCreate(data))}>
          <Box
            sx={{
              pb: theme => `${theme.spacing(8)} !important`
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
                      label='Department Name'
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.name)}

                      // {...(errors.name && { helperText: errors.name.message })}
                    />
                  )}
                />
              </Grid>
              {/* {editMode && (
                        <Grid item xs={12} sm={12}>
                          <Controller
                            name='hodId'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <CustomTextField
                                select
                                fullWidth
                                value={value}
                                label='Head of Department'
                                onChange={onChange}
                                error={Boolean(errors.hodId)}
                                aria-describedby='stepper-linear-account-hodId'

                                // {...(errors.departmentId && { helperText: 'This field is required' })}
                              >
                                <MenuItem value=''>
                                  {staffsInSelectedDepartment?.length
                                    ? 'Select Head of Department'
                                    : 'No Staff in Selected Department'}{' '}
                                </MenuItem>
                                {staffsInSelectedDepartment?.map(staff => (
                                  <MenuItem key={staff?.id} value={staff.id}>
                                    {`${formatFirstLetter(staff?.firstname)} ${formatFirstLetter(staff?.lastname)} `}
                                  </MenuItem>
                                ))}
                              </CustomTextField>
                            )}
                          />
                        </Grid>
                      )} */}
            </Grid>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
            <Button type='submit' variant='contained'>
              {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Create'}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateDepartment
