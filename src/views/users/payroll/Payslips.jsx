import React, { useEffect, useState, Fragment } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import IconButton from '@mui/material/IconButton'

import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import TablePagination from '@mui/material/TablePagination'

import { useAppDispatch } from '../../../hooks'
import NoData from '../../../@core/components/emptyData/NoData'
import CustomSpinner from '../../../@core/components/custom-spinner'
import { formatDateToYYYYMM, formatFirstLetter, formatMonthYear, getFirstId } from '../../../@core/utils/format'
import DeleteDialog from '../../../@core/components/delete-dialog'
import { usePayslip } from '../../../hooks/usePayslip'
import { fetchPayslips, printPayslip } from '../../../store/apps/payslip/asyncthunk'
import { useDepartments } from '../../../hooks/useDepartments'
import GeneratePayslip from './GeneratePayslip'
import PageHeader from './PayslipPageHeader'
import { Card, CardContent, CardHeader, Grid, MenuItem, Tooltip } from '@mui/material'
import { findDepartment } from '../../../@core/utils/utils'
import SendPayslip from './SendPayslipToEmail'

const PayslipTable = () => {
  // Hooks
  const dispatch = useAppDispatch()
  const [payslipData, loading] = usePayslip()
  const [DepartmentsData] = useDepartments()

  // States

  const [payslip, setpayslip] = useState(null)
  const [generateModalOpen, setPayslipOpen] = useState(false)
  const [sendModalOpen, setSendModalOpen] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [selectedpayslip, setSelectedpayslip] = useState(null)
  const [period, setPeriod] = useState(formatDateToYYYYMM(new Date()))
  const [departmentId, setDepartmentId] = useState()

  const [departmentName, setDepartmentName] = useState('')

  const defaultId = getFirstId(DepartmentsData)

  const defaultPeriod = formatDateToYYYYMM(new Date())

  const month = formatMonthYear(new Date())

  const handleChangeDepartment = e => {
    setDepartmentId(e.target.value)
  }

  const printPayslipItem = (selectedId, period) => {
    printPayslip(selectedId, period).then(res => {
      console.log(res, 'print res')
    })
  }

  const updateFetch = () => setFetch(!refetch)


  const toggleGeneratePayslipDrawer = () => setPayslipOpen(!generateModalOpen)
  const toggleSendPayslipModal = () => setSendModalOpen(!sendModalOpen)

  useEffect(() => {
    dispatch(fetchPayslips({ period: defaultPeriod, departmentId: departmentId ? departmentId : defaultId }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, defaultId, departmentId])

  return (
    <div>
      <Card>
        <CardHeader title='Filter' />
        <CardContent>
          <Grid container spacing={12}>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                select
                fullWidth
                label='Department'
                placeholderText='he'

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
          </Grid>
        </CardContent>
      </Card>

      <PageHeader
        action1='Send Payslips to Staffs Email'
        toggleSend={toggleSendPayslipModal}
        month={month}
        action2='Generate Payslip'
        toggle={toggleGeneratePayslipDrawer}
      />
      <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                S/N
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                STAFF NAME
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                DEPARTMENT NAME
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                GROSS SALARY
              </TableCell>
              {/* <TableCell align='left' sx={{ minWidth: 100 }}>
                TOTAL ALLOWANCE
              </TableCell>  */}
              <TableCell align='center' sx={{ minWidth: 100 }}>
                TOTAL DEDUCTION
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                NET PAY
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
                  const staffDepartmentId = payslip?.user?.departmentId
                  const matchingDepartment = findDepartment(DepartmentsData, staffDepartmentId)
                  const departmentName = matchingDepartment?.name

                  return (
                    <TableRow hover role='checkbox' key={payslip?.id}>
                      <TableCell align='left'>{i + 1}</TableCell>
                      <TableCell align='left'>{`${formatFirstLetter(payslip?.user?.firstname)} ${formatFirstLetter(payslip?.user?.lastname)}`}</TableCell>
                      <TableCell align='left'>{departmentName ? formatFirstLetter(departmentName) : ''}</TableCell>
                      <TableCell align='left'>{payslip?.user?.grossSalary?.toLocaleString() || '--'}</TableCell>
                      {/* <TableCell align='left'>{payslip?.totalAllowance?.toLocaleString() || '--'}</TableCell> */}
                      <TableCell align='center'>{payslip?.totalDeduction?.toLocaleString() || '--'}</TableCell>
                      <TableCell align='left'>{payslip?.amount?.toLocaleString() || '--'}</TableCell>
                      <TableCell align='center' sx={{ display: 'flex' }}>
                        <Tooltip title='View more details' placement='top'>
                          <IconButton size='small'>
                            <Icon icon='tabler:eye' />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Print Payslip' placement='top'>
                          <IconButton size='small' onClick={() => printPayslipItem(payslip?.user?.id, payslip?.period)}>
                            <Icon icon='material-symbols:print-outline' />
                          </IconButton>
                        </Tooltip>
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

      {/* 

       */}

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
    </div>
  )
}

export default PayslipTable
