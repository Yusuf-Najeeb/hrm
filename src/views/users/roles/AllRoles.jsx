import React, { useEffect, useState, Fragment } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import IconButton from '@mui/material/IconButton'

import CustomAvatar from 'src/@core/components/mui/avatar'

import { styled } from '@mui/material/styles'

import Icon from 'src/@core/components/icon'

import TablePagination from '@mui/material/TablePagination'

import { useAppDispatch } from '../../../hooks'
import NoData from '../../../@core/components/emptyData/NoData'
import { deleteRole, fetchRoles } from '../../../store/apps/roles/asyncthunk'
import CustomSpinner from '../../../@core/components/custom-spinner'
import { formatDate, formatFirstLetter } from '../../../@core/utils/format'
import DeleteDialog from '../../../@core/components/delete-dialog'
import EditRole from './EditRole'
import { useRoles } from '../../../hooks/useRoles'
import PageHeader from '../components/PageHeader'
import CreateRole from './CreateRole'
import RoleCard from './RoleCard'
import { Box, Typography, Card, CardHeader, CardContent } from '@mui/material'

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

  const [RolesDate, loading, paging] = useRoles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [role, setRole] = useState(null)
  const [addRoleOpen, setaddRoleOpen] = useState(false)
  const [refetch, setFetch] = useState(false)

  const [openEditDrawer, setEditDrawer] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [roleToView, setRoleToView] = useState(null)

  const setActiveRole = value => {
    setRole(value)
    setOpenCanvas(true)
  }

  // are you sure ou want to delete funtion
  const doDelete = value => {
    setDeleteModal(true)
    setSelectedRole(value?.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSelectedRole(null)
  }

  const updateFetch = () => setFetch(!refetch)

  const ondeleteClick = () => {
    dispatch(deleteRole(selectedRole))
    updateFetch()
    doCancelDelete()
  }

  const setRoleToEdit = prod => {
    setEditDrawer(true)
    setRoleToView(prod)
  }

  const handleChangePage = newPage => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const toggleRoleDrawer = () => setaddRoleOpen(!addRoleOpen)
  const toggleEditDrawer = () => setEditDrawer(!openEditDrawer)

  useEffect(() => {
    dispatch(fetchRoles({ page: page + 1, limit: 10 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, refetch])

  return (
    <div>
      <RoleCard />

      {/* <PageHeader action='Create Role' toggle={toggleRoleDrawer} /> */}
      <Card sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
        <CardHeader title='All Roles' />
        <CardContent>
          <PageHeader action='Create Role' toggle={toggleRoleDrawer} />
        </CardContent>
      </Card>
      <TableContainer component={Paper} sx={{ maxHeight: 840, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                S/N
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                ROLE TITLE
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                DATE CREATED
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
                {RolesDate?.map((role, i) => (
                  <TableRow hover role='checkbox' key={role.id}>
                    <TableCell align='left'> {i + 1}</TableCell>
                    <TableCell align='left' sx={{ textTransform: 'uppercase', display: 'flex' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CustomAvatar
                          skin='light'
                          sx={{ mr: 4, width: 30, height: 30 }}
                          color={userRoleObj[role?.name]?.color || 'primary'}
                        >
                          <Icon icon={userRoleObj[role?.name]?.icon} />
                        </CustomAvatar>
                        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                          {formatFirstLetter(role?.name)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align='left'>{formatDate(role?.createdAt)}</TableCell>

                    <TableCell align='left' sx={{ display: 'flex' }}>
                      <IconButton size='small' onClick={() => setRoleToEdit(role)}>
                        <Icon icon='tabler:edit' />
                      </IconButton>
                      <IconButton size='small' onClick={() => doDelete(role)}>
                        <Icon icon='tabler:trash' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

                {RolesDate?.length === 0 && (
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
        <EditRole
          open={openEditDrawer}
          closeModal={toggleEditDrawer}
          refetchRoles={updateFetch}
          selectedRole={roleToView}
        />
      )}

      {addRoleOpen && <CreateRole open={addRoleOpen} closeModal={toggleRoleDrawer} refetchRoles={updateFetch} />}
    </div>
  )
}

export default RolesTable
