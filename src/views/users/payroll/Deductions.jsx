import React, { useEffect, useState, Fragment } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import IconButton from '@mui/material/IconButton'
import { Box, Typography } from '@mui/material'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'
import TablePagination from '@mui/material/TablePagination'
import CustomChip from 'src/@core/components/mui/chip'
import { useAppDispatch } from '../../../hooks'
import NoData from '../../../@core/components/emptyData/NoData'
import CustomSpinner from '../../../@core/components/custom-spinner'
import { formatDateToYYYYMM, formatFirstLetter, formatCurrency } from '../../../@core/utils/format'
import { getInitials } from 'src/@core/utils/get-initials'
import DeleteDialog from '../../../@core/components/delete-dialog'
import { useDeductions } from '../../../hooks/useDeductions'
import PageHeader from '../components/PageHeader'
import { deleteDeduction, fetchDeductions } from '../../../store/apps/deductions/asyncthunk'
import { useStaffs } from '../../../hooks/useStaffs'
import CreateDeduction from './CreateDeduction'
import PayrollHeader from './PayrollHeaderCard'

const DeductionsTable = () => {
  // Hooks
  const dispatch = useAppDispatch()
  const [deductionsData, loading] = useDeductions()
  const [StaffsData] = useStaffs()

  // States
  const [type, setType] = useState('')
  const [addDeductionOpen, setDeductionOpen] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedDeduction, setSelectedDeduction] = useState(null)
  const defaultPeriod = formatDateToYYYYMM(new Date())
  const formatDefaultPeriod = defaultPeriod.slice(0, 4) + '-' + defaultPeriod.slice(4, 6)

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

  const doDelete = value => {
    setDeleteModal(true)
    setSelectedDeduction(value?.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSelectedDeduction(null)
  }

  const updateFetch = () => setFetch(!refetch)

  const onDeleteClick = () => {
    dispatch(deleteDeduction(selectedDeduction))
    updateFetch()
    doCancelDelete()
  }
  const toggleDrawer = () => setDeductionOpen(!addDeductionOpen)

  const toggleAddBenefit = () => {
    setDeductionOpen(!addDeductionOpen)
    setType('benefit')
  }

  const toggleAddDeduction = () => {
    setDeductionOpen(!addDeductionOpen)
    setType('deduction')
  }

  useEffect(() => {
    dispatch(fetchDeductions())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch])

  return (
    <main>
      <PayrollHeader />
      <Box sx={{ display: 'flex', justifyContent: 'end', gap: 6, mb: 4 }}>
        <PageHeader action='Add Benefit' toggle={toggleAddBenefit} />
        <PageHeader action='Add Deduction' toggle={toggleAddDeduction} />
      </Box>
      <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                STAFF
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                PERIOD
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                GROSS SALARY
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                AMOUNT
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 100 }}>
                TYPE
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
                {deductionsData?.map((deduction, i) => {
                  const userName = StaffsData.find(user => user.id === deduction?.userId)

                  return (
                    <TableRow hover role='checkbox' key={deduction.id}>
                      <TableCell align='left'>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {renderClient(deduction)}
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                              {`${formatFirstLetter(userName?.firstname)} ${formatFirstLetter(userName?.lastname)}`}
                            </Typography>
                            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                              {deduction?.user?.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align='left'>{deduction?.period}</TableCell>
                      <TableCell align='left'>{formatCurrency(userName?.grossSalary)}</TableCell>
                      <TableCell align='left'>{formatCurrency(deduction?.amount, true)}</TableCell>
                      <TableCell align='center'>
                        {deduction?.type === 'benefit' ? (
                          <CustomChip rounded size='small' skin='light' color='success' label='Benefit' />
                        ) : (
                          <CustomChip rounded size='small' skin='light' color='error' label='Deduction' />
                        )}
                      </TableCell>
                      <TableCell align='center'>
                        {deduction?.modifiedBy
                          ? formatFirstLetter(deduction?.modifiedBy)
                          : formatFirstLetter(deduction?.createdBy)}
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton size='small' onClick={() => doDelete(deduction)}>
                          <Icon icon='tabler:trash' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}

                {deductionsData?.length === 0 && (
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

      <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={onDeleteClick} />

      {addDeductionOpen && (
        <CreateDeduction
          openDialog={addDeductionOpen}
          closeDialog={toggleDrawer}
          amountType={type}
          updateFetch={updateFetch}
        />
      )}
    </main>
  )
}

export default DeductionsTable
