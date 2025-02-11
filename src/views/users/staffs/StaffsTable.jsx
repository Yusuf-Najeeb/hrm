import React, { useEffect, useState, Fragment } from 'react'

// Next JS
import { useRouter } from 'next/navigation'

// MUI
import {
  Box,
  Typography,
  Tooltip,
  Grid,
  Card,
  CardContent,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch
} from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
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
import { getInitials } from 'src/@core/utils/get-initials'
import CustomTextField from 'src/@core/components/mui/text-field'
import TableHeader from './TableHeader'
import TablePagination from '@mui/material/TablePagination'
import { useAppDispatch } from '../../../hooks'
import { useDepartments } from '../../../hooks/useDepartments'

import NoData from '../../../@core/components/emptyData/NoData'
import CustomSpinner from '../../../@core/components/custom-spinner'
import { formatFirstLetter, formatCurrency, formatDateToYYYYMM } from '../../../@core/utils/format'
import { fetchStaffs, deleteStaff, undoDeleteStaff } from '../../../store/apps/staffs/asyncthunk'
import { fetchDepartments } from '../../../store/apps/departments/asyncthunk'
import { fetchRoles } from '../../../store/apps/roles/asyncthunk'
import { useRoles } from '../../../hooks/useRoles'
import { useStaffs } from '../../../hooks/useStaffs'
import DeleteStaff from './DeleteStaff'
import EditStaffCard from './EditStaffCard'
import ViewStaff from './ViewStaff'
import StaffHeaderCard from './StaffHeaderCard'
import { styled } from '@mui/material/styles'
import AddStaff from './AddStaff'
import { Stack } from '@mui/system'

const StaffsTable = () => {
  const dispatch = useAppDispatch()

  // const router = useRouter()
  const [StaffsData, loading, paging] = useStaffs()
  const [DepartmentsData] = useDepartments()
  const [RolesData] = useRoles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [search, setSearch] = useState('')
  const [addStaffModal, setAddStaffModal] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [openViewDrawer, setViewDrawer] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [staffToView, setStaffToView] = useState(null)
  const [staffToUpdate, setStaffToUpdate] = useState(null)
  const [hasUploadedImage, setHasUploadedImage] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [selectedDept, setSelectedDept] = useState('')

  const IconButtonStyled = styled(IconButton)(({ theme }) => ({
    fontSize: theme.typography.body1.fontSize,
    color: `${theme.palette.primary.main} !important`
  }))

  const renderClient = row => {
    const initials = `${formatFirstLetter(row?.firstname)} ${formatFirstLetter(row?.lastname)}`
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

  const toggleEditModal = val => {
    setStaffToUpdate(val)
    setEditModal(true)
  }

  const closeEditModal = () => {
    setStaffToUpdate(null)
    setEditModal(false)
  }

  const closeCanvas = () => {
    setViewDrawer(false)
    setStaffToView(null)
  }

  const handleToggle = value => {
    let payload

    if (value?.deletedAt) {
      undoDeleteStaff(value?.id).then(res => {
        if (res?.data?.success) {
          dispatch(fetchStaffs({ page: 1, limit: 10 }))
        }
      })
    } else {
      setDeleteModal(true)
      setSelectedStaff(value?.id)
    }
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSelectedStaff(null)
  }

  const updateFetch = () => setFetch(!refetch)

  const setActiveStaff = staff => {
    setViewDrawer(true)
    setStaffToView(staff)
  }

  const handleChangePage = newPage => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleFilter = val => {
    setSearch(val)
  }

  const handleDepartmentChange = e => {
    setSelectedDept(e.target.value)
  }

  const toggleAddStaffModal = () => {
    setAddStaffModal(!addStaffModal)
  }

  useEffect(() => {
    dispatch(fetchRoles({ page: 1, limit: 200 }))
    dispatch(fetchStaffs({ page: page + 1, departmentId: selectedDept, q: search }))
    dispatch(fetchDepartments({ page: 1, limit: 10 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, refetch, hasUploadedImage, selectedDept, search])

  return (
    <Stack>
      <StaffHeaderCard />
      <Grid item xs={12}>
        <Card
          sx={{
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
          }}
        >
          <CardContent
            sx={{
              pt: theme => `${theme.spacing(5)} !important`,
              pb: theme => `${theme.spacing(4)} !important`,
              px: theme => `${theme.spacing(6)} !important`
            }}
          >
            <Grid container spacing={6} sx={{ display: 'flex', justifyContent: 'start' }}>
              <Grid item xs={12} sm={4}>
                <CustomTextField
                  select
                  fullWidth
                  label='Department'
                  SelectProps={{ value: selectedDept, onChange: e => handleDepartmentChange(e) }}
                >
                  <MenuItem value=''>Select Department</MenuItem>
                  {DepartmentsData?.map(department => (
                    <MenuItem key={department?.id} value={department?.id}>
                      {formatFirstLetter(department?.name)}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>

              <TableHeader value={search} handleFilter={handleFilter} clickAddBtn={toggleAddStaffModal} />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid>
        <TableContainer component={Paper} sx={{ maxHeight: 840, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='left' sx={{ maxWidth: 80 }}>
                  STAFF
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 100 }}>
                  DEPARTMENT
                </TableCell>
                <TableCell align='left' sx={{ maxWidth: 50 }}>
                  ROLE
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 150 }}>
                  GROSS SALARY
                </TableCell>
                <TableCell align='left' sx={{ maxWidth: 80 }}>
                  PHONE
                </TableCell>
                <TableCell align='left' sx={{ maxWidth: 80 }}>
                  STATUS
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
                    <TableRow hover role='checkbox' key={staff?.id}>
                      <TableCell align='left'>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {renderClient(staff)}
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                              {`${formatFirstLetter(staff?.firstname)} ${formatFirstLetter(staff?.lastname)}`}
                            </Typography>
                            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                              {staff?.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align='left'>{staff?.department?.name.toUpperCase()}</TableCell>
                      <TableCell align='left' sx={{ minWidth: 150 }}>
                        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'flex-start', alignItems: 'center' }}>
                          <IconButton component={IconButtonStyled} sx={{ pb: 3 }}>
                            <Icon
                              icon={
                                staff?.role?.name == 'Admin' || staff?.role?.name == 'admin'
                                  ? 'tabler:device-laptop'
                                  : staff?.role?.name == 'staff'
                                  ? 'tabler:circle-check'
                                  : staff?.role?.name == 'accountant'
                                  ? 'tabler:chart-pie-2'
                                  : 'tabler:circle-check'
                              }
                            />
                          </IconButton>
                          <Typography sx={{ color: 'text.secondary' }}>
                            {staff?.role?.name == 'Admin' || staff?.role?.name == 'admin' ? 'Admin' : 'Staff'}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell align='left'>{formatCurrency(staff?.grossSalary, true)}</TableCell>

                      <TableCell align='left'>{staff?.phone ? staff?.phone : 'N/A'}</TableCell>

                      <TableCell align='left'>
                        {staff?.deletedAt === null ? (
                          <CustomChip
                            rounded
                            skin='light'
                            size='small'
                            label={'Active'}
                            color='success'
                            sx={{ textTransform: 'capitalize' }}
                          />
                        ) : (
                          <CustomChip
                            rounded
                            skin='light'
                            size='small'
                            label={'Inactive'}
                            color='error'
                            sx={{ textTransform: 'capitalize' }}
                          />
                        )}
                      </TableCell>

                      <TableCell align='left'>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                          <Tooltip title='Edit Staff'>
                            <IconButton size='small' onClick={() => toggleEditModal(staff)}>
                              <Icon icon='tabler:edit' />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title='View Staff'>
                            <IconButton
                              size='small'
                              sx={{ color: 'text.secondary' }}
                              onClick={() => setActiveStaff(staff)}
                            >
                              <Icon icon='tabler:eye' />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title='Deactivate Staff'>
                            <FormControlLabel
                              control={
                                <Switch checked={staff.deletedAt === null} onChange={() => handleToggle(staff)} />
                              }
                            />
                          </Tooltip>
                        </Box>
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
      </Grid>
      <DeleteStaff
        open={deleteModal}
        handleClose={doCancelDelete}
        selectedStaff={selectedStaff}
        refetchStaffs={updateFetch}
      />
      {addStaffModal && (
        <AddStaff open={toggleAddStaffModal} closeModal={toggleAddStaffModal} refetchStaffs={updateFetch} />
      )}
      {editModal && <EditStaffCard data={staffToUpdate} openEdit={toggleEditModal} closeModal={closeEditModal} />}
      {openViewDrawer && (
        <ViewStaff
          open={openViewDrawer}
          closeCanvas={closeCanvas}
          staffUser={staffToView}
          hasUploadedImage={hasUploadedImage}
          setHasUploadedImage={setHasUploadedImage}
        />
      )}
    </Stack>
  )
}

export default StaffsTable
