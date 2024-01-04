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
import DepartmentsTableHeader from './DepartmentsHeader'
import CreateDepartment from './CreateDepartment'
import CustomSpinner from '../../../@core/components/custom-spinner'
import { formatFirstLetter } from '../../../@core/utils/format'
import { useDepartments } from '../../../hooks/useDepartments'
import DeleteDialog from '../../../@core/components/delete-dialog'
import EditDepartment from './EditDepartment'

const DepartmentsTable = () => {
  const dispatch = useAppDispatch()

  //   const paging = useAppSelector(store => store.expenditure.expenditurePaging)
//   const [page, setPage] = useState(0)
// const [openCanvas, setOpenCanvas] = useState(false)
// const [openPayModal, setOpenPayModal] = useState(false)
// const [searchVal, setSearchVal] = useState('')
// const [startDate, setStartDate] = useState<string>(moment(new Date()).startOf('year').format('YYYY-MM-DD'))
// const [endDate, setEndDate] = useState<string>(moment(new Date()).endOf('year').format('YYYY-MM-DD'))
// const [showcreateBtn, setShowCreateBtn] = useState<boolean>(false)

//   const [DepartmentsData, loadingDepartments] = useAppSelector(store => store.departments.DepartmentsData)

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

  const setActiveDepartment = (value) => {
    setDepartment(value)
    setOpenCanvas(true)
  }

  const closeCanvas = () => {
    setOpenCanvas(false)
    setOpenPayModal(false)
    setDepartment(null)
  }

  const doDelete = (value) => {
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

  const setDepartmentToEdit = (prod) => {
    setEditDrawer(true)
    setDepartmentToView(prod)
  }

  const handleChangePage = ( newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const toggleDepartmentDrawer = () => setAdddepartmentOpen(!addDepartmentOpen)
  const toggleEditDrawer = () => setEditDrawer(!openEditDrawer)

  useEffect(() => {
    dispatch(fetchDepartments({page: page + 1, limit: 10 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, refetch])

  return (
    <div>
      <DepartmentsTableHeader
        action='Create Department'
        toggle={toggleDepartmentDrawer}
      />
      <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                S/N
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                NAME
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

      {/* {openCanvas && <Viewdepartment open={openCanvas} closeCanvas={closeCanvas} department={department} />}
      {openPayModal && (
        <GeneraldepartmentPay visible={openPayModal} togglePayModal={closeCanvas} department={department} />
      )}
      
      */}

<DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />

{openEditDrawer && (
  <EditDepartment 
  open={EditDepartment} 
  closeModal={toggleEditDrawer}
  refetchDepartments={updateFetch}
  selectedDepartment={DepartmentToView}
  />
)}

{addDepartmentOpen && (
        <CreateDepartment
          open={addDepartmentOpen}
          closeModal={toggleDepartmentDrawer}
          refetchDepartments={updateFetch}
        />
      )} 

    </div>
  )
}

export default DepartmentsTable
