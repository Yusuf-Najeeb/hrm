// ** React Imports
import React, { useEffect, useState, Fragment } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomChip from 'src/@core/components/mui/chip'

//** Icon Import */
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import { useAppDispatch, useAppSelector } from '../../../hooks'
import NoData from '../../../@core/components/emptyData/NoData'
import { deleteDepartment, fetchDepartments } from '../../../store/apps/departments/asyncthunk'
import CustomSpinner from '../../../@core/components/custom-spinner'
import { formatFirstLetter } from '../../../@core/utils/format'
import { useDepartments } from '../../../hooks/useDepartments'
import HeaderCards from './HeaderCards'
import DeleteDialog from '../../../@core/components/delete-dialog'
import EditDepartment from './AddEditDepartment'

const DepartmentsTable = () => {
  //** States
  const [page, setPage] = useState(0)
  const [value, setValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [department, setDepartment] = useState(null)
  const [addDepartmentOpen, setAdddepartmentOpen] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [openEditDrawer, setEditDrawer] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [DepartmentToView, setDepartmentToView] = useState(null)

  // ** Hooks
  const dispatch = useAppDispatch()
  const [DepartmentsData, loadingDepartments, paging, aggregations] = useDepartments()

  // const setActiveDepartment = value => {
  //   setDepartment(value)
  //   setOpenCanvas(true)
  // }

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

  const updateFetch = () => {
    setFetch(!refetch)
  }

  const ondeleteClick = () => {
    dispatch(deleteDepartment(selectedDepartment))
    doCancelDelete()
    setFetch(!refetch)
  }

  const setDepartmentToEdit = dept => {
    setEditDrawer(true)
    setDepartmentToView(dept)
    setEditMode(true)
  }

  const cancelEditMode = () => {
    setEditDrawer(false)
    setDepartmentToEdit(null)
    setEditMode(false)
  }

  const handleChangePage = newPage => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // const toggleDepartmentDrawer = () => setAdddepartmentOpen(!addDepartmentOpen)
  // const toggleEditDrawer = () => setEditDrawer(!openEditDrawer)

  useEffect(() => {
    dispatch(fetchDepartments({ page: page + 1, limit: 200 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, refetch])

  return (
    <div>
      <HeaderCards />
      <Card sx={{ mt: theme => `${theme.spacing(8)} !important` }}>
        {/* <CardHeader title='Departments' /> */}
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} spacing={4}>
              <CustomTextField
                fullWidth
                value={value}
                placeholder={'Search Department'}
                onChange={e => handleFilter(e.target.value)}
                sx={{ mr: 4 }}
              />
            </Grid>
          </Grid>
          <Box sx={{ minWidth: 350, display: 'flex', justifyContent: 'end', alignItems: 'center', gap: 4 }}>
            <Button
              //  onClick={openModal}
              variant='contained'
            >
              New Department
              <Icon icon='mdi:plus' fontSize={20} />
            </Button>
          </Box>
        </CardContent>
        <CardContent sx={{ px: theme => `${theme.spacing(0)} !important` }}>
          <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  <TableCell align='left' sx={{ minWidth: 50 }}>
                    NAME
                  </TableCell>

                  <TableCell align='left' sx={{ minWidth: 50 }}>
                    CREATED ON
                  </TableCell>

                  <TableCell align='left' sx={{ minWidth: 80 }}>
                    MODIFIED BY
                  </TableCell>

                  <TableCell align='center' sx={{ minWidth: 80 }}>
                    HOD
                  </TableCell>

                  <TableCell align='right' sx={{ minWidth: 50 }}>
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
                        <TableCell align='left'>{formatFirstLetter(department?.name)}</TableCell>
                        <TableCell>{department?.createdAt.slice(0, 7)}</TableCell>

                        <TableCell align='left'>{`${
                          department?.lastChangedBy !== null
                            ? department?.lastChangedBy.toUpperCase()
                            : department?.createdBy.toUpperCase()
                        }`}</TableCell>
                        <TableCell align='center' sx={{ minWidth: 80 }}>
                          {`${
                            department?.hod
                              ? `${formatFirstLetter(department?.hod.firstname)}  ${formatFirstLetter(
                                  department?.hod?.lastname
                                )}`
                              : '--'
                          }`}
                        </TableCell>
                        <TableCell align='right' sx={{ display: 'flex' }}>
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

          {/* <Item sx={{ width: '40%', display: { xs: 'none', sm: 'block' } }}>
          <EditDepartment
            refetchDepartments={updateFetch}
            selectedDepartment={DepartmentToView}
            editMode={editMode}
            closeEdit={cancelEditMode}
          />
        </Item> */}

          <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />
        </CardContent>
      </Card>
      <TablePagination
        page={page}
        component='div'
        count={paging?.totalItems}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 20]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ ml: 'auto' }}
      />
    </div>
  )
}

export default DepartmentsTable
