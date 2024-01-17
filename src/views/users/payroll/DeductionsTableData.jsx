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

import TablePagination from '@mui/material/TablePagination'

import NoData from '../../../@core/components/emptyData/NoData'
import CustomSpinner from '../../../@core/components/custom-spinner'
import { formatDateToYYYYMM, formatFirstLetter } from '../../../@core/utils/format'
import {  fetchDeductionsForOneUser } from '../../../store/apps/deductions/asyncthunk'


const DeductionsTableForNonAdminStaff = () => {


  // States
  const [activeUserDeductions, setActiveUserDeductions] = useState([])
  const [loading, setLoading] = useState(true)

  const defaultPeriod = formatDateToYYYYMM(new Date())

  useEffect(()=>{
    fetchDeductionsForOneUser(activeUser?.id, defaultPeriod).then((res)=>{

        setActiveUserDeductions([...res])
        setLoading(false)
    }).catch(()=>{
        setLoading(false)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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
                DEDUCTION CATEGORY
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                DEDUCTION AMOUNT
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
               {activeUserDeductions?.map((deduction, i) => (
                  <TableRow hover role='checkbox' key={deduction.id}>
                    <TableCell align='left'>{i + 1}</TableCell>
                    {/* <TableCell align='left'>{deductioncategoryData[]}</TableCell> */}
                    <TableCell align='left'>Lateness</TableCell>
                    <TableCell align='left'>{deduction?.amount?.toLocaleString()}</TableCell>
                  </TableRow>
                )) }

                {activeUserDeductions?.length === 0 && (
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

export default DeductionsTableForNonAdminStaff


