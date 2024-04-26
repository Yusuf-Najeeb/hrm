// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import Grid from '@mui/material/Grid'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

// import Dialog from '@mui/material/Dialog'
// import { styled } from '@mui/material/styles'

import { CircularProgress, MenuItem, Typography } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { editDepartmentSchema } from 'src/@core/Formschema'
import axios from 'axios'
import { useAppDispatch } from '../../../hooks'
import { Fragment, useEffect, useState } from 'react'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { fetchStaffs } from '../../../store/apps/staffs/asyncthunk'
import { useStaffs } from '../../../hooks/useStaffs'
import { createDepartment } from '../../../store/apps/departments/asyncthunk'
import { formatFirstLetter } from '../../../@core/utils/format'
import { theme } from 'antd'

// import { getAllStaffsInOneDepartment } from '../../../store/apps/staffs/asyncthunk'
// const CustomCloseButton = styled(IconButton)(({ theme }) => ({
//   top: 0,
//   right: 0,
//   color: 'grey.500',
//   position: 'absolute',
//   boxShadow: theme.shadows[2],
//   transform: 'translate(10px, -10px)',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: `${theme.palette.background.paper} !important`,
//   transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
//   '&:hover': {
//     transform: 'translate(7px, -5px)'
//   }
// }))

const defaultValues = {
  name: '',
  hodId: 0
}

const EditDepartment = ({ refetchDepartments, selectedDepartment, editMode, closeEdit }) => {
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
    try {
      const { data } = await axios.patch(`department?id=${selectedDepartment.id}`, values)

      if (data.success) {
        notifySuccess('Department updated successfully')
        reset()
        refetchDepartments()
      }
    } catch (error) {
      notifyError('Error updating department')
    }
  }

  const newDepartment = async data => {
    const res = dispatch(createDepartment(data))
    reset()
    refetchDepartments()
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
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
            <TableCell align='center' sx={{ minWidth: 50 }}>
              Create Department
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <form
                onSubmit={handleSubmit(data => {
                  if (editMode) {
                    updateDepartment(data)
                  } else {
                    newDepartment(data)
                  }
                })}
              >
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
                    {editMode && (
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
                    )}
                  </Grid>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
                  <Button type='submit' variant='contained'>
                    {isSubmitting ? (
                      <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} />
                    ) : editMode ? (
                      'Update'
                    ) : (
                      'Create'
                    )}
                  </Button>

                  {editMode && <Button onClick={closeEdit}>Cancel</Button>}
                </Box>
              </form>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default EditDepartment
