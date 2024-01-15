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

import CustomChip from 'src/@core/components/mui/chip'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import NoData from '../../../@core/components/emptyData/NoData'
import { deleteDepartment, fetchDepartments } from '../../../store/apps/departments/asyncthunk'

//mport DepartmentsTable from '../../users/departments/AllDepartments'
//import DepartmentsTable from '../../../views/apps/payroll/PageHeader'
//import CreateDepartment from './CreateDepartment'
//import DepartmentsHeader from '../../users/departments/DepartmentsHeader'
import DepartmentsTableHeader from '../departments/DepartmentsHeader'

import CustomSpinner from '../../../@core/components/custom-spinner'
import { formatFirstLetter } from '../../../@core/utils/format'
import { useDepartments } from '../../../hooks/useDepartments'
import DeleteDialog from '../../../@core/components/delete-dialog'

import EditDepartment from '../departments/EditDepartment'
import CreateDeduction from './CreateDeduction'
import PageHeader from '../components/PageHeader'

const PayrollTable = () => {
  const dispatch = useAppDispatch()

  const [DepartmentsData, loadingDepartments, paging] = useDepartments()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [department, setDepartment] = useState(null)
  const [addDepartmentOpen, setAdddepartmentOpen] = useState(false)
  const [refetch, setFetch] = useState(false)

  const [openEditDrawer, setEditDrawer] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState(null)

  const [DepartmentToView, setDepartmentToView] = useState(null)

  const setActiveDepartment = value => {
    setDepartment(value)
    setOpenCanvas(true)
  }

  const closeCanvas = () => {
    setOpenCanvas(false)
    setOpenPayModal(false)
    setDepartment(null)
  }

  const doDelete = value => {
    setDeleteModal(true)
    setSelectedDepartment(value?.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSelectedDepartment(null)
  }

  const updateFetch = () => setFetch(!refetch)

  const ondeleteClick = () => {
    dispatch(deleteDepartment(selectedDepartment))
    updateFetch()
    doCancelDelete()
  }

  const setDepartmentToEdit = prod => {
    setEditDrawer(true)
    setDepartmentToView(prod)
  }

  const handleChangePage = newPage => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const toggleDepartmentDrawer = () => setAdddepartmentOpen(!addDepartmentOpen)
  const toggleEditDrawer = () => setEditDrawer(!openEditDrawer)

  useEffect(() => {
    dispatch(fetchDepartments({ page: page + 1, limit: 10 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, refetch])

  return (
    <div>
      <PageHeader action='Create Deduction ' toggle={toggleDepartmentDrawer} />
      <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                S/N
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                Deduction
              </TableCell>

              <TableCell align='left' sx={{ minWidth: 100 }}>
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingDepartments ? (
              <TableRow className='text-center'>
                <TableCell colSpan={6}>
                  <CustomSpinner />
                </TableCell>
              </TableRow>
            ) : (
              <Fragment>
                {DepartmentsData?.map((department, i) => (
                  <TableRow hover role='checkbox' key={department.id}>
                    <TableCell align='left'>{i + 1}</TableCell>
                    <TableCell align='left'>{formatFirstLetter(department?.name)}</TableCell>

                    <TableCell align='left' sx={{ display: 'flex' }}>
                      <IconButton size='small' onClick={() => setDepartmentToEdit(department)}>
                        <Icon icon='tabler:edit' />
                      </IconButton>
                      <IconButton size='small' onClick={() => doDelete(department)}>
                        <Icon icon='tabler:trash' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

                {DepartmentsData?.length === 0 && (
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

      <TablePagination
        page={page}
        component='div'
        count={paging?.totalItems}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 20]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />

      {openEditDrawer && (
        <EditDepartment
          open={openEditDrawer}
          closeModal={toggleEditDrawer}
          refetchDepartments={updateFetch}
          selectedDepartment={DepartmentToView}
        />
      )}

      {addDepartmentOpen && (
        <CreateDeduction
          open={addDepartmentOpen}
          closeModal={toggleDepartmentDrawer}
          refetchDepartments={updateFetch}
        />
      )}
    </div>
  )
}

export default PayrollTable
