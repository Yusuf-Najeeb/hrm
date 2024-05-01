import React, { useState } from 'react'

// ** Custom Component Import
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { requirePeriod } from 'src/@core/Formschema'
import Icon from 'src/@core/components/icon'

// ** MUI Imports
import { CircularProgress, Paper, Typography, Card, CardHeader, CardContent, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { CustomInput } from '../duty-roster/UploadRosterDialog'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import IconButton from '@mui/material/IconButton'

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
  period: ''
}

const GeneratePayroll = ({ open, closeModal, refetchPayroll }) => {
  const [departmentId, setDepartmentId] = useState()
  const DepartmentsData = []

  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(requirePeriod) })

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth='lg'
      scroll='body'
      //eslint-disable-next-line
      //   TransitionComponent={Transition}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', maxWidth: 950 } }}
    >
      <DialogContent
        sx={{
          pb: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(12.5)} !important`],
          pt: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(12.5)} !important`],
          px: theme => [`${theme.spacing(1)} !important`, `${theme.spacing(1)} !important`]
        }}
      >
        <CustomCloseButton onClick={closeModal}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </CustomCloseButton>
        <Card>
          <CardHeader title='Filter Payroll' />
          <CardContent>
            <Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name='period'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selected={value}
                      dateFormat='MMM yy'
                      popperPlacement='bottom-end'
                      showMonthYearPicker
                      maxDate={new Date()}
                      onChange={e => {
                        onChange(e)
                      }}
                      placeholderText='MM/YYYY'
                      customInput={
                        <CustomInput
                          value={value}
                          onChange={onChange}
                          autoComplete='off'
                          label='Date'
                          error={Boolean(errors.period)}
                          {...(errors.period && { helperText: errors.period.message })}
                        />
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {/*         
        <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='left' sx={{ minWidth: 50 }}>
                  <FormControlLabel control={<Checkbox />} label='All' />
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 100 }}>
                  ID
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 100 }}>
                  NAME
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 100 }}>
                  TOTAL BENEFITS
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 100 }}></TableCell>
                <TableCell align='left' sx={{ minWidth: 100 }}>
                  TOTAL DEDUCTIONS
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 100 }}>
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer> */}
      </DialogContent>
    </Dialog>
  )
}

export default GeneratePayroll
