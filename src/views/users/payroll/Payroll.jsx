import React, { useState, useEffect } from 'react'

// ** Custom Component Import
import { useAppDispatch } from '../../../hooks'
import CustomTextField from 'src/@core/components/mui/text-field'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { requirePeriod } from 'src/@core/Formschema'
import Icon from 'src/@core/components/icon'
import { formatFirstLetter, formatCurrency, formatDateToYYYY, formatMonthYear } from '../../../@core/utils/format'

// ** MUI Imports
import { DataGrid } from '@mui/x-data-grid'
import {
  CircularProgress,
  Paper,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid,
  MenuItem,
  Checkbox
} from '@mui/material'
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
import IconButton from '@mui/material/IconButton'

// * Global states
import { fetchPayroll } from '../../../store/apps/payroll/asyncthunk'
import { usePayrolls } from '../../../hooks/usePayroll'

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
  const dispatch = useAppDispatch()
  const [PayrollData, paging, loading, aggregations] = usePayrolls()

  //States
  const [checked, setChecked] = useState([])
  const [allChecked, setAllChecked] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [status, setStatus] = useState('pending')
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [period, setPeriod] = useState('all-all')
  console.log(period, 'Period')

  // * Default values
  const defaultMonths = []
  const defaultYear = formatDateToYYYY(new Date())

  const getMonths = () => {
    let month
    for (let month = 0; month < 12; month++) {
      const date = new Date(2022, month, 1)
      const monthName = date.toLocaleString('default', { month: 'long' })
      defaultMonths.push(monthName)
    }
  }
  getMonths()

  const handleChangeYear = e => {
    setYear(e.target.value)
  }

  const handleChangeMonth = e => {
    setMonth(e.target.value)
  }
  const updateFetch = () => setFetch(!refetch)

  useEffect(() => {
    setPeriod(year + '-' + month)
    dispatch(fetchPayroll({ status: status, period: period }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, status, year, month])

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth='lg'
      scroll='body'
      //eslint-disable-next-line
      //   TransitionComponent={Transition}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', minWidth: 950 } }}
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
            <Grid container spacing={6}>
              <Grid item xs={12} sm={3}>
                <CustomTextField
                  select
                  fullWidth
                  label='Year'
                  placeholder='Year'
                  SelectProps={{ value: year, onChange: e => handleChangeYear(e) }}
                >
                  <MenuItem value=''>All</MenuItem>
                  <MenuItem value={+defaultYear - 1}>{+defaultYear - 2}</MenuItem>
                  <MenuItem value={+defaultYear - 1}>{+defaultYear - 1}</MenuItem>
                  <MenuItem value={+defaultYear}>{+defaultYear}</MenuItem>
                  <MenuItem value={+defaultYear + 1}>{+defaultYear + 1}</MenuItem>
                  <MenuItem value={+defaultYear + 1}>{+defaultYear + 2}</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField
                  select
                  fullWidth
                  label='Month'
                  placeholder='Month'
                  SelectProps={{ value: month, onChange: e => handleChangeMonth(e) }}
                >
                  <MenuItem value=''>All</MenuItem>
                  {defaultMonths.map((month, i) => (
                    <MenuItem key={i} value={`0${i + 1}`}>
                      {month}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='left' sx={{ minWidth: 50 }}>
                  <Checkbox
                    size='small'
                    name={'all-checked'}
                    onChange={() => {
                      if (allChecked) {
                        setAllChecked(false)
                        setChecked([])
                      } else {
                        setAllChecked(true)
                        setChecked(PayrollData?.map(p => p?.id))
                      }
                    }}
                  />
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 100 }}>
                  ID
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 100 }}>
                  NAME
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 100 }}>
                  GROSS SALARY
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 100 }}>
                  TOTAL BENEFITS
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 100 }}>
                  TOTAL DEDUCTIONS
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 100 }}>
                  MODIFIED BY
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {PayrollData?.map(payroll => (
                <TableRow key={payroll?.id}>
                  <TableCell align='left'>
                    <Checkbox
                      size='small'
                      name={`${payroll?.id}-checked`}
                      checked={checked.includes(payroll?.id)}
                      onChange={() => {
                        if (checked.includes(payroll.id)) {
                          const restChecked = checked.filter(c => c !== payroll?.id)
                          setChecked(restChecked)
                          setAllChecked(false)
                        } else {
                          if (checked.length + 1 === payroll?.length) {
                            setAllChecked(true)
                          }
                          setChecked([...checked, payroll?.id])
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell align='left' sx={{ minWidth: 50 }}>
                    {payroll?.id}
                  </TableCell>
                  <TableCell align='left'>{`${formatFirstLetter(payroll?.user?.firstname)} ${formatFirstLetter(
                    payroll?.user?.lastname
                  )}`}</TableCell>
                  <TableCell align='left'>{formatCurrency(payroll?.amount, true)}</TableCell>
                  <TableCell align='left'>{formatCurrency(payroll?.totalAllowance, true)}</TableCell>
                  <TableCell align='left'>{formatCurrency(payroll?.totalDeduction, true)}</TableCell>
                  <TableCell align='left'>
                    {payroll?.lastChangedBy
                      ? formatFirstLetter(payroll?.lastChangedBy)
                      : formatFirstLetter(payroll?.createdBy)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  )
}

export default GeneratePayroll
