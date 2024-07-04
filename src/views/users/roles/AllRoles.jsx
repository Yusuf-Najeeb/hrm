// ** React Imports
import React, { useEffect, useState, Fragment } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import CustomChip from 'src/@core/components/mui/chip'

// ** Icon Import
import Icon from 'src/@core/components/icon'

// ** Components, Hooks & Utils Imports
import { useAppDispatch } from '../../../hooks'
import NoData from '../../../@core/components/emptyData/NoData'
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomSpinner from '../../../@core/components/custom-spinner'
import { deleteRole, fetchRoles } from '../../../store/apps/roles/asyncthunk'
import { fetchStaffs } from '../../../store/apps/staffs/asyncthunk'
import { useRoles } from '../../../hooks/useRoles'
import { formatDate, formatFirstLetter } from '../../../@core/utils/format'
import DeleteDialog from '../../../@core/components/delete-dialog'
import EditRole from './EditRole'
import RoleCard from './RoleCard'
import { useStaffs } from '../../../hooks/useStaffs'
import ViewStaff from '../staffs/ViewStaff'

const userRoleObj = {
  'super-admin': { icon: 'grommet-icons:user-admin', color: 'info' },
  admin: { icon: 'tabler:device-laptop', color: 'secondary' },
  staff: { icon: 'tabler:circle-check', color: 'success' },
  librarian: { icon: 'tabler:edit', color: 'info' },
  accountant: { icon: 'tabler:chart-pie-2', color: 'primary' },
  'house-master': { icon: 'tabler:user', color: 'warning' }
}

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}))

const RolesTable = () => {
  const dispatch = useAppDispatch()
  const [RolesDate] = useRoles()
  const [StaffsData, loading, paging] = useStaffs()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [role, setRole] = useState(null)
  const [addRoleOpen, setaddRoleOpen] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [openViewDrawer, setViewDrawer] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [staff, setStaff] = useState(null)
  const [search, setSearch] = useState('')

  const setActiveRole = value => {
    setRole(value)
    setOpenCanvas(true)
  }

  // are you sure ou want to delete funtion
  // const doDelete = value => {
  //   setDeleteModal(true)
  //   setSelectedRole(value?.id)
  // }

  // const doCancelDelete = () => {
  //   setDeleteModal(false)
  //   setSelectedRole(null)
  // }

  const updateFetch = () => setFetch(!refetch)

  const handleFilter = val => {
    setSearch(val)
  }

  // const ondeleteClick = () => {
  //   dispatch(deleteRole(selectedRole))
  //   updateFetch()
  //   doCancelDelete()
  // }

  const handleViewStaff = val => {
    setViewDrawer(true)
    setStaff(val)
  }

  const handleChangePage = newPage => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const toggleViewDrawer = () => setViewDrawer(!openViewDrawer)

  useEffect(() => {
    dispatch(fetchRoles({ page: page + 1, limit: 10 }))
    dispatch(fetchStaffs({ page: page + 1, q: search }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, refetch, search])

  return (
    <div>
      <RoleCard />
      <Card sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
        <CardContent sx={{ py: theme => theme.spacing(4), display: 'flex', justifyContent: 'end' }}>
          <CustomTextField
            defaultValue={search}
            placeholder='Search Staff'
            onChange={e => handleFilter(e.target.value)}
          />
        </CardContent>
      </Card>
      <TableContainer component={Paper} sx={{ maxHeight: 840, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                USER
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                DESIGNATION
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                ROLE
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                DEPARTMENT
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                DATE CREATED
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                STATUS
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                ACTION
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
                    <TableCell align='left'>{`${formatFirstLetter(staff?.firstname)} ${formatFirstLetter(
                      staff?.lastname
                    )}`}</TableCell>
                    <TableCell align='left'>{formatFirstLetter(staff?.designation) || '--'}</TableCell>
                    <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CustomAvatar
                          skin='light'
                          sx={{ mr: 4, width: 30, height: 30 }}
                          color={userRoleObj[role?.name]?.color || 'primary'}
                        >
                          <Icon icon={userRoleObj[role?.name]?.icon} />
                        </CustomAvatar>
                        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                          {formatFirstLetter(staff?.role?.name)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{formatFirstLetter(staff?.department.name) || '--'}</TableCell>
                    <TableCell align='left'>{formatDate(staff?.createdAt)}</TableCell>
                    <TableCell>
                      {staff?.deletedAt ? (
                        <CustomChip rounded size='small' skin='light' color='error' label='Inactive' />
                      ) : (
                        <CustomChip rounded size='small' skin='light' color='success' label='Active' />
                      )}
                    </TableCell>
                    <TableCell align='left'>
                      <IconButton size='small' onClick={() => handleViewStaff(staff)}>
                        <Icon icon='tabler:eye' />
                      </IconButton>
                      {/* <IconButton size='small' onClick={() => doDelete(staff)}>
                        <Icon icon='tabler:trash' />
                      </IconButton> */}
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

      <ViewStaff open={openViewDrawer} closeCanvas={toggleViewDrawer} staffUser={staff} />

      {/* <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} /> */}

      {/* {openEditDrawer && (
        <EditRole
          open={openEditDrawer}
          closeModal={toggleEditDrawer}
          refetchRoles={updateFetch}
          selectedRole={roleToView}
        />
      )} */}
    </div>
  )
}

export default RolesTable
