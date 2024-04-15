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
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { requireName } from 'src/@core/Formschema'
import { createDepartment } from '../../../store/apps/departments/asyncthunk'
import { useAppDispatch } from '../../../hooks'

export const CustomCloseButton = styled(IconButton)(({ theme }) => ({
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

const CreateDepartmentStatic = ({ refetchDepartments }) => {
  const dispatch = useAppDispatch()

  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(requireName) })

  const onSubmit = async data => {
    const res = await dispatch(createDepartment(data))

    reset()

    // closeModal()
    refetchDepartments()
  }

  return (
    <Box
      sx={{
        mt: theme => `${theme.spacing(4)} !important`,
        py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(8)} !important`],
        px: theme => [`${theme.spacing(0)} !important`],
        border: theme => `${theme.palette.divider} solid 1px`,
        borderRadius: '4px',
        margin: '0'
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(0)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    label='Department Name'
                    placeholder='Enter a Department name'
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.name)}
                    {...(errors.name && { helperText: errors.name.message })}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button type='submit' variant='contained'>
            {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Create'}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default CreateDepartmentStatic
