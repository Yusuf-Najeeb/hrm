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


import { useAppDispatch } from '../../../hooks'
import NoData from '../../../@core/components/emptyData/NoData'
import CustomSpinner from '../../../@core/components/custom-spinner'
import {  formatFirstLetter, formatMonthYear,  } from '../../../@core/utils/format'
import { fetchPayslipForOneStaff, printPayslip } from '../../../store/apps/payslip/asyncthunk'
import { useDepartments } from '../../../hooks/useDepartments'
import {  CircularProgress, Tooltip } from '@mui/material'
import { findDepartment } from '../../../@core/utils/utils'
import { getUserRole } from '../../../@core/utils/checkUserRole'

const PayslipTableForNonAdmin = () => {
  // Hooks
  const [DepartmentsData] = useDepartments()

  // States
  const [activeUserPayslips, setActiveUserPayslips] = useState([])
  const [loading, setLoading] = useState(true)
  const [refetch, setFetch] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)
  const [isPayslipDownloadLinkAvailable, setIsPayslipAvailable] = useState(false)
  const [payslipDownloadLink, setPayslipDownloadLink] = useState()
  const [printingPayslipId, setPrintingPayslipId] = useState(null);

  const activeUser = getUserRole()

  const printPayslipItem = (selectedId, period) => {
    setIsPrinting(true)
    setPrintingPayslipId(selectedId)
    printPayslip(selectedId, period).then(res => {
        setIsPayslipAvailable(true)
        setPayslipDownloadLink(res.data.url)
      setIsPrinting(false)
    }).catch(()=>{
        setIsPrinting(false)
    })
  }

  useEffect(()=>{
    fetchPayslipForOneStaff(activeUser?.id).then((res)=>{

        setActiveUserPayslips([...res])
        setLoading(false)
    }).catch(()=>{
        setLoading(false)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[activeUser])


  return (
    <div>
      
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
                MONTH
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
                {activeUserPayslips?.map((payslip, i) => {
                  const staffDepartmentId = payslip?.user?.departmentId
                  const matchingDepartment = findDepartment(DepartmentsData, staffDepartmentId)
                  const departmentName = matchingDepartment?.name

                  const formattedMonth = formatMonthYear(payslip?.period)

                  return (
                    <TableRow hover role='checkbox' key={payslip?.id}>
                      <TableCell align='left'>{i + 1}</TableCell>
                      <TableCell align='left'>{`${formatFirstLetter(payslip?.user?.firstname)} ${formatFirstLetter(payslip?.user?.lastname)}`}</TableCell>
                      <TableCell align='left'>{formattedMonth ? formattedMonth : ''}</TableCell>
                      <TableCell align='left'>{payslip?.user?.grossSalary?.toLocaleString() || '--'}</TableCell>
                      {/* <TableCell align='left'>{payslip?.totalAllowance?.toLocaleString() || '--'}</TableCell> */}
                      <TableCell align='center'>{payslip?.totalDeduction?.toLocaleString() || '--'}</TableCell>
                      <TableCell align='left'>{payslip?.amount?.toLocaleString() || '--'}</TableCell>
                      <TableCell align='center' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        

                        {printingPayslipId === payslip?.user?.id && isPrinting  ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 
                        <Tooltip title='Print Payslip' placement='top'>
                          <IconButton size='small' onClick={() => printPayslipItem(payslip?.user?.id, payslip?.period)}>
                            <Icon icon='material-symbols:print-outline' />
                          </IconButton>
                        </Tooltip>}
                      </TableCell>
                    </TableRow>
                  )
                })}

                {activeUserPayslips?.length === 0 && (
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

    </div>
  )
}

export default PayslipTableForNonAdmin
