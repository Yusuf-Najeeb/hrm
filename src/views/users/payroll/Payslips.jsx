import React, { useEffect, useState, Fragment } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import IconButton from '@mui/material/IconButton'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomChip from 'src/@core/components/mui/chip'
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import TablePagination from '@mui/material/TablePagination'
import { getInitials } from 'src/@core/utils/get-initials'
import { useAppDispatch } from '../../../hooks'
import NoData from '../../../@core/components/emptyData/NoData'
import CustomSpinner from '../../../@core/components/custom-spinner'
import {
  formatDateToYYYY,
  formatDateToYYYYMM,
  formatFirstLetter,
  formatMonthYear,
  formatCurrency,
  getFirstId
} from '../../../@core/utils/format'
import DeleteDialog from '../../../@core/components/delete-dialog'
import { usePayslip } from '../../../hooks/usePayslip'
import { fetchPayslips, printPayslip } from '../../../store/apps/payslip/asyncthunk'
import { fetchPayroll, generatePayroll } from '../../../store/apps/payroll/asyncthunk'
import { useDepartments } from '../../../hooks/useDepartments'
import { fetchStaffs } from '../../../store/apps/staffs/asyncthunk'
import { useStaffs } from '../../../hooks/useStaffs'
import { usePayrolls } from '../../../hooks/usePayroll'
import GeneratePayslip from './GeneratePayslip'
import PageHeader from './PayslipPageHeader'
import GeneratePayroll from './Payroll'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  MenuItem,
  Tooltip,
  Button
} from '@mui/material'
import Divider from '@mui/material/Divider'
import { findDepartment } from '../../../@core/utils/utils'
import SendPayslip from './SendPayslipToEmail'
import PayrollHeader from './PayrollHeaderCard'

const PayslipTable = () => {
  // Hooks
  const dispatch = useAppDispatch()
  const [PayrollData, loading] = usePayrolls()
  const [DepartmentsData] = useDepartments()
  const [StaffsData] = useStaffs()

  // States

  const [payslip, setpayslip] = useState(null)
  const [generateModalOpen, setPayslipOpen] = useState(false)
  const [sendModalOpen, setSendModalOpen] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [selectedpayslip, setSelectedpayslip] = useState(null)
  const [period, setPeriod] = useState(formatDateToYYYYMM(new Date()))
  const [departmentId, setDepartmentId] = useState()
  const [staffId, setStaffId] = useState()
  const [year, setYear] = useState()
  const [isPrinting, setIsPrinting] = useState(false)
  const [isPayslipDownloadLinkAvailable, setIsPayslipAvailable] = useState(false)
  const [payslipDownloadLink, setPayslipDownloadLink] = useState()
  const [printingPayslipId, setPrintingPayslipId] = useState(null)
  const [openPayroll, setPayroll] = useState(false)

  const defaultId = getFirstId(DepartmentsData)

  const defaultPeriod = formatDateToYYYYMM(new Date())

  const defaultYear = formatDateToYYYY(new Date())

  const month = formatMonthYear(new Date())

  const handleChangeDepartment = e => {
    setDepartmentId(e.target.value)
  }

  const handleChangeStaff = e => {
    setStaffId(e.target.value)
  }

  const handleChangeYear = e => {
    console.log(e.target.value)
  }

  const printPayslipItem = (selectedId, period) => {
    setIsPrinting(true)
    setPrintingPayslipId(selectedId)
    printPayslip(selectedId, period)
      .then(res => {
        setIsPayslipAvailable(true)
        setPayslipDownloadLink(res.data.url)
        setIsPrinting(false)
      })
      .catch(() => {
        setIsPrinting(false)
      })
  }

  const togglePayrollModal = () => {
    setPayroll(!openPayroll)
  }

  const renderClient = row => {
    const initials = `${formatFirstLetter(row?.user?.firstname)} ${formatFirstLetter(row?.user?.lastname)}`
    if (row?.image?.length) {
      return (
        <CustomAvatar
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${row?.image}`}
          sx={{ mr: 2.5, width: 38, height: 38 }}
        />
      )
    } else {
      return (
        <CustomAvatar
          skin='light'
          color={row?.id % 2 === 0 ? 'primary' : 'secondary'}
          sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
        >
          {getInitials(initials || 'John Doe')}
        </CustomAvatar>
      )
    }
  }
  const updateFetch = () => setFetch(!refetch)

  const toggleGeneratePayslipDrawer = () => setPayslipOpen(!generateModalOpen)
  const toggleSendPayslipModal = () => setSendModalOpen(!sendModalOpen)

  useEffect(() => {
    dispatch(fetchPayroll({ userId: staffId, departmentId: departmentId, period: year }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, staffId, departmentId, year])

  useEffect(() => {
    if (isPayslipDownloadLinkAvailable) {
      //   window.location.href = payslipDownloadLink
      window.open(payslipDownloadLink, '_blank')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPayslipDownloadLinkAvailable])

  return (
    <main>
      <PayrollHeader />
      <Card
        sx={{
          py: theme => `${theme.spacing(1)} !important`,
          px: theme => `${theme.spacing(0)} !important`
        }}
      >
        <CardContent>
          <Grid container spacing={6} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                select
                fullWidth
                label='Year'
                placeholder='Year'
                SelectProps={{ value: year, onChange: e => handleChangeYear(e) }}
              >
                <MenuItem value=''>All</MenuItem>
                <MenuItem value={+defaultYear - 1}>{+defaultYear - 1}</MenuItem>
                <MenuItem value={+defaultYear}>{+defaultYear}</MenuItem>
                <MenuItem value={+defaultYear + 1}>{+defaultYear + 1}</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                select
                fullWidth
                label='Department'
                placeholder='Department'
                // eslint-disable-next-line
                // placeholderText={`${DepartmentsData[defaultId]?.name}`}
                SelectProps={{ value: departmentId, onChange: e => handleChangeDepartment(e) }}
              >
                <MenuItem value=''>All</MenuItem>
                {DepartmentsData?.map(department => (
                  <MenuItem key={department?.id} value={department?.id}>
                    {formatFirstLetter(department?.name)}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                select
                fullWidth
                label='Staff'
                placeholder='Staff'
                SelectProps={{ value: staffId, onChange: e => handleChangeStaff(e) }}
              >
                <MenuItem value=''>All</MenuItem>
                {StaffsData?.map(staff => (
                  <MenuItem key={staff?.id} value={staff?.id}>
                    {`${formatFirstLetter(staff?.firstname)} ${formatFirstLetter(staff?.lastname)}`}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          </Grid>

          <Divider component='div' sx={{ mt: theme => `${theme.spacing(4)} !important` }} />

          <Grid>
            <PageHeader
              month={month}
              action2='Generate/Fetch Payroll'
              toggle={toggleGeneratePayslipDrawer}
              action1='Make Payment'
              togglePayment={togglePayrollModal}
            />
          </Grid>
        </CardContent>
      </Card>

      <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                STAFF NAME
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                PERIOD
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                GROSS SALARY
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                BENEFITS
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 100 }}>
                DEDUCTIONS
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                STATUS
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 100 }}>
                MODIFIED BY
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 100 }}>
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow className='text-center'>
                <TableCell colSpan={6}>
                  <CustomSpinner />
                </TableCell>
              </TableRow>
            ) : (
              <Fragment>
                {PayrollData?.map((payroll, i) => {
                  const staffDepartmentId = payroll?.user?.departmentId
                  const matchingDepartment = findDepartment(DepartmentsData, staffDepartmentId)
                  const departmentName = matchingDepartment?.name

                  return (
                    <TableRow hover role='checkbox' key={payroll?.id}>
                      <TableCell align='left'>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {renderClient(payroll)}
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                              {`${formatFirstLetter(payroll?.user?.firstname)} ${formatFirstLetter(
                                payroll?.user?.lastname
                              )}`}
                            </Typography>
                            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                              {payroll?.user?.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align='left'>{payroll?.period || '--'}</TableCell>
                      <TableCell align='left'>{formatCurrency(payroll?.user?.grossSalary, true) || '--'}</TableCell>
                      <TableCell align='left'>{formatCurrency(payroll?.totalAllowance, true) || '--'}</TableCell>
                      <TableCell align='center'>{formatCurrency(payroll?.totalDeduction, true) || '--'}</TableCell>
                      <TableCell align='left'>
                        {payroll?.paymentMade ? (
                          <CustomChip rounded size='small' skin='light' color='success' label='Paid' />
                        ) : (
                          <CustomChip rounded size='small' skin='light' color='error' label='pending' />
                        )}
                      </TableCell>
                      <TableCell align='center'>
                        {payroll?.lastChangedBy
                          ? formatFirstLetter(payroll?.lastChangedBy)
                          : formatFirstLetter(payroll?.createdBy) || '--'}
                      </TableCell>
                      <TableCell align='center'>
                        {printingPayslipId === payroll?.user?.id && isPrinting ? (
                          <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} />
                        ) : (
                          <Tooltip title='Print Payslip' placement='top'>
                            <IconButton
                              size='small'
                              onClick={() => printPayslipItem(payroll?.user?.id, payroll?.period)}
                            >
                              <Icon icon='material-symbols:print-outline' />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}

                {PayrollData?.length === 0 && (
                  <tr className='text-center'>
                    <td colSpan={12}>
                      <NoData />
                    </td>
                  </tr>
                )}
              </Fragment>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <TablePagination
        page={page}
        component='div'
        count={Paging?.totalItems}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 20]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}

      {generateModalOpen && (
        <GeneratePayslip
          open={generateModalOpen}
          closeModal={toggleGeneratePayslipDrawer}
          refetchPayslip={updateFetch}
        />
      )}
      {openPayroll && (
        <GeneratePayroll open={openPayroll} closeModal={togglePayrollModal} refetchPayroll={updateFetch} />
      )}

      {sendModalOpen && (
        <SendPayslip open={sendModalOpen} closeModal={toggleSendPayslipModal} refetchPayslip={updateFetch} />
      )}
    </main>
  )
}

export default PayslipTable
