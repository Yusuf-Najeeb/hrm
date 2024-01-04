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
import { useAppDispatch, useAppSelector } from '../../../hooks'
import NoData from '../../../@core/components/emptyData/NoData'
import CustomSpinner from '../../../@core/components/custom-spinner'
import { formatFirstLetter } from '../../../@core/utils/format'
import { useStaffs } from '../../../hooks/useStaffs'
import {  fetchStaffs } from '../../../store/apps/staffs/asyncthunk'
import PageHeader from '../components/PageHeader'
import DeleteStaff from './DeleteStaff'
import ViewStaff from './ViewStaff'

const StaffsTable = () => {
  const dispatch = useAppDispatch()

  const [StaffsData, loading, paging] = useStaffs()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [staff, setStaff] = useState(null)
  const [addStaffOpen, setAddstaffOpen] = useState(false)
  const [refetch, setFetch] = useState(false)

  const [openViewDrawer, setViewDrawer] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)
  
  const [staffToView, setStaffToView] = useState(null)

  const [hasUploadedImage, setHasUploadedImage] = useState(false)

  const closeCanvas = () => {
    setViewDrawer(false)
    setStaffToView(null)
  }

  const doDelete = (value) => {
    setDeleteModal(true)
    setSelectedStaff(value?.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSelectedStaff(null)
  }

  const updateFetch = () => setFetch(!refetch)

  const setActiveStaff = (staff) => {
    setViewDrawer(true)
    setStaffToView(staff)
  }

  const handleChangePage = ( newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const togglestaffDrawer = () => setAddstaffOpen(!addstaffOpen)
  const toggleEditDrawer = () => setViewDrawer(!openViewDrawer)

  useEffect(() => {
    dispatch(fetchStaffs({page: page + 1 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, refetch, hasUploadedImage])

  return (
    <div>
      <PageHeader
      action="Add Staff"
        toggle={togglestaffDrawer}
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
                EMAIL
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                DESIGNATION
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
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
                {StaffsData?.map((staff, i) => (
                  <TableRow hover role='checkbox' key={staff.id}>
                    <TableCell align='left'>{i + 1}</TableCell>
                    <TableCell align='left'>{`${formatFirstLetter(staff?.firstname)} ${formatFirstLetter(staff?.lastname)}`}</TableCell>
                    <TableCell align='left'>{staff.email}</TableCell>
                    <TableCell align='left'>{staff.designation}</TableCell>

                    <TableCell align='left' sx={{ display: 'flex' }}>

                      <IconButton size='small' onClick={() => setActiveStaff(staff)}>
                        <Icon icon='tabler:eye' />
                      </IconButton>
                      <IconButton size='small' onClick={() => doDelete(staff)}>
                        <Icon icon='tabler:trash' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

                {StaffsData?.length === 0 && (
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

      {/* {openCanvas && <Viewstaff open={openCanvas} closeCanvas={closeCanvas} staff={staff} />}
      {openPayModal && (
        <GeneralstaffPay visible={openPayModal} togglePayModal={closeCanvas} staff={staff} />
      )}
      
      */}

<DeleteStaff open={deleteModal} handleClose={doCancelDelete} selectedStaff={selectedStaff} refetchStaffs={updateFetch} />


{/* {openViewDrawer && (
        <CreateDepartment
          open={addDepartmentOpen}
          closeModal={toggleDepartmentDrawer}
          refetchStaffs={updateFetch}
        />
      )}  */}

{openViewDrawer && <ViewStaff open={openViewDrawer} closeCanvas={closeCanvas} staffUser={staffToView} hasUploadedImage={hasUploadedImage} setHasUploadedImage={setHasUploadedImage}/>}

    </div>
  )
}

export default StaffsTable
