import { useEffect } from 'react'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { CircularProgress } from '@mui/material'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'

// Others
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { editSalaryItemSchema } from 'src/@core/Formschema'
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

const defaultValues = {
  name: ''
}

const EditSalaryItem = ({ open, closeModal, refetchSalaryItems, selectedSalaryItem }) => {

  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(editSalaryItemSchema) })

  const onUpdate = async (values) => {
    try {
      const { data } = await axios.patch(`salary-items?id=${selectedSalaryItem.id}`, values)

      if (data.success) {
        notifySuccess('Payslip Item updated successfully')
        reset()
        closeModal()
        refetchSalaryItems()
      }
    } catch (error) {
      notifyError('Error updating payslip item')
    }
  }

  useEffect(() => {
    setValue('name', selectedSalaryItem.name)
    setValue('percentage', selectedSalaryItem.percentage)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth='md'
      scroll='body'

      //   TransitionComponent={Transition}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', maxWidth: 390 } }}
    >
      <DialogContent
        sx={{
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <CustomCloseButton onClick={closeModal}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </CustomCloseButton>

        <form onSubmit={handleSubmit(onUpdate)}>
          <DialogContent
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
                      label='Payslip Item'
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.name)}

                      // {...(errors.name && { helperText: errors.name.message })}
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
                    <CustomTextField
                      fullWidth
                      label='Percentage'
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.percentage)}

                      // {...(errors.name && { helperText: errors.name.message })}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button type='submit' variant='contained'>
              {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Update'}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditSalaryItem
