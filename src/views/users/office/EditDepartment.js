//** React Imports */
import { Fragment, useEffect, useState } from 'react'

//** Axios Imports */
import axios from 'axios'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'

//** Custom component Imports
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { editDepartmentSchema } from 'src/@core/FormSchema'
import { useAppDispatch } from '../../../hooks'
import { fetchStaffs } from '../../../store/apps/staffs/asyncthunk'
import { useStaffs } from '../../../hooks/useStaffs'
import { formatFirstLetter } from '../../../@core/utils/format'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'

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
  name: '',
  hodId: 0
}

const EditDepartment = ({ open, close, selectedDepartment, refetchDepartments }) => {
  const [StaffsData] = useStaffs()
  const [staffsInSelectedDepartment, setStaffs] = useState([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchStaffs())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(editDepartmentSchema) })

  const updateDepartment = async values => {
    const { data } = await axios.patch(`department?id=${selectedDepartment.id}`, values)

    if (data.success) {
      notifySuccess('Department updated successfully')
      refetchDepartments()
      reset()
      close()
    } else {
      notifyError('Error updating department')
    }
  }

  // Editing Department
  useEffect(() => {
    setValue('name', selectedDepartment?.name)

    if (selectedDepartment) {
      setValue('hodId', selectedDepartment?.hodId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDepartment])

  useEffect(() => {
    const departmentStaff = StaffsData.filter(staff => staff?.department?.id === selectedDepartment?.id)

    setStaffs(departmentStaff)

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDepartment])

  return (
    <Fragment>
      <Dialog
        fullWidth
        open={open}
        maxWidth='sm'
        scroll='body'
        sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', maxWidth: 450 } }}
      >
        <form onSubmit={handleSubmit(data => updateDepartment(data))}>
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
                      {...(errors.departmentId && { helperText: 'This field is required' })}
                    >
                      <MenuItem value=''>
                        {' '}
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
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <Button type='submit' variant='contained'>
              {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Update'}
            </Button>
            <Button onClick={close}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  )
}

export default EditDepartment
