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
  getFirstId
} from '../../../@core/utils/format'
import DeleteDialog from '../../../@core/components/delete-dialog'
import { usePayslip } from '../../../hooks/usePayslip'
import { fetchPayslips, printPayslip } from '../../../store/apps/payslip/asyncthunk'
import { fetchPayroll } from '../../../store/apps/payroll/asyncthunk'
import { useDepartments } from '../../../hooks/useDepartments'
import { fetchStaffs } from '../../../store/apps/staffs/asyncthunk'
import { useStaffs } from '../../../hooks/useStaffs'
import { usePayroll } from '../../../hooks/usePayroll'
import GeneratePayslip from './GeneratePayslip'
import PageHeader from './PayslipPageHeader'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  MenuItem,
  Tooltip
} from '@mui/material'
import { findDepartment } from '../../../@core/utils/utils'
import SendPayslip from './SendPayslipToEmail'
import PayrollHeader from './PayrollHeaderCard'

const PayslipTable = () => {
  // Hooks
  const dispatch = useAppDispatch()
  const [payslipData, loading] = usePayslip()
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

  // useEffect(() => {
  //   dispatch(fetchPayslips({ period: defaultPeriod, departmentId: departmentId ? departmentId : defaultId }))

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [refetch, defaultId, departmentId])

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
      <Card>
        <CardHeader title='Filter' />
        <CardContent sx={{ display: 'flex', justifyContent: 'between', alignItems: 'end' }}>
          <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'end' }}>
            {/* Year/Period */}
            <Grid item xs={12} sm={3}>
              <CustomTextField
                select
                fullWidth
                label='Year'
                placeholder='Year'
                SelectProps={{ value: year, onChange: e => handleChangeYear(e) }}
              >
                <MenuItem value=''>Select Year</MenuItem>
                <MenuItem value={+defaultYear - 1}>{+defaultYear - 1}</MenuItem>
                <MenuItem value={+defaultYear}>{+defaultYear}</MenuItem>
                <MenuItem value={+defaultYear + 1}>{+defaultYear + 1}</MenuItem>
              </CustomTextField>
            </Grid>

            {/* Department */}
            <Grid item xs={12} sm={3}>
              <CustomTextField
                select
                fullWidth
                label='Department'
                placeholder='Department'
                // eslint-disable-next-line
                // placeholderText={`${DepartmentsData[defaultId]?.name}`}
                SelectProps={{ value: departmentId, onChange: e => handleChangeDepartment(e) }}
              >
                <MenuItem value=''>Select Department</MenuItem>
                {DepartmentsData?.map(department => (
                  <MenuItem key={department?.id} value={department?.id}>
                    {formatFirstLetter(department?.name)}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            {/* UserId */}
            <Grid item xs={12} sm={3}>
              <CustomTextField
                select
                fullWidth
                label='Staff'
                placeholder='Staff'
                SelectProps={{ value: staffId, onChange: e => handleChangeStaff(e) }}
              >
                <MenuItem value=''>Select Staff</MenuItem>
                {StaffsData?.map(staff => (
                  <MenuItem key={staff?.id} value={staff?.id}>
                    {`${formatFirstLetter(staff?.firstname)} ${formatFirstLetter(staff?.lastname)}`}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3}>
            <PageHeader
              action1='Send Payslips to Staffs Email'
              toggleSend={toggleSendPayslipModal}
              month={month}
              action2='Generate/Fetch'
              toggle={toggleGeneratePayslipDrawer}
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
              <TableCell align='center' sx={{ minWidth: 100 }}>
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
                {payslipData?.map((payslip, i) => {
                  // const staffDepartmentId = payslip?.user?.departmentId
                  // const matchingDepartment = findDepartment(DepartmentsData, staffDepartmentId)
                  // const departmentName = matchingDepartment?.name
                  return (
                    <TableRow hover role='checkbox' key={payslip?.id}>
                      <TableCell align='left'>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {renderClient(payslip)}
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                              {`${formatFirstLetter(payslip?.user?.firstname)} ${formatFirstLetter(
                                payslip?.user?.lastname
                              )}`}
                            </Typography>
                            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                              {payslip?.user?.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align='left'>{departmentName ? formatFirstLetter(departmentName) : ''}</TableCell>
                      <TableCell align='left'>{payslip?.user?.grossSalary?.toLocaleString() || '--'}</TableCell>
                      <TableCell align='center'>{payslip?.totalDeduction?.toLocaleString() || '--'}</TableCell>
                      <TableCell align='left'>{payslip?.amount?.toLocaleString() || '--'}</TableCell>
                      <TableCell align='center'>
                        {printingPayslipId === payslip?.user?.id && isPrinting ? (
                          <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} />
                        ) : (
                          <Tooltip title='Print Payslip' placement='top'>
                            <IconButton
                              size='small'
                              onClick={() => printPayslipItem(payslip?.user?.id, payslip?.period)}
                            >
                              <Icon icon='material-symbols:print-outline' />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}

                {payslipData?.length === 0 && (
                  <tr className='text-center'>
                    <td colSpan={6}>
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

      {sendModalOpen && (
        <SendPayslip open={sendModalOpen} closeModal={toggleSendPayslipModal} refetchPayslip={updateFetch} />
      )}
    </main>
  )
}

export default PayslipTable
