// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Next Import
// import Link from 'next/link'

// ** Custom Component Import
import { useAppDispatch } from '../../../hooks'
import { formatFirstLetter } from '../../../@core/utils/format'
import { fetchRoles, deleteRole } from '../../../store/apps/roles/asyncthunk'
import { fetchPermissions } from '../../../store/apps/permissions/asyncthunk'
import { usePermissions } from '../../../hooks/usePermissions'
import { useRoles } from '../../../hooks/useRoles'
import { getInitials } from 'src/@core/utils/get-initials'
import PageHeader from '../components/PageHeader'
import CreateRole from './CreateRole'
import DeleteDialog from '../../../@core/components/delete-dialog'

// ** Icon Import
import Icon from 'src/@core/components/icon'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import AvatarGroup from '@mui/material/AvatarGroup'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Permissions from './Permissions'
import EditRole from './EditRole'

const RoleCard = () => {
  const dispatch = useAppDispatch()
  const [PermissionsData] = usePermissions()
  const [RolesData] = useRoles()
  const [page, setPage] = useState(0)
  const [addRoleOpen, setaddRoleOpen] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [openPermissions, setPermissions] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('Add')
  const [anchorEl, setAnchorEl] = useState(Array(PermissionsData?.length)?.fill(null))
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [editModal, setEditModal] = useState(false)

  const handleRowOptionsClick = (event, index) => {
    const newAnchorEl = [...anchorEl]
    newAnchorEl[index] = event.currentTarget
    setAnchorEl(newAnchorEl)
  }
  const updateFetch = () => setFetch(!refetch)

  const handleRowOptionsClose = index => {
    const newAnchorEl = [...anchorEl]
    newAnchorEl[index] = null
    setAnchorEl(newAnchorEl)
  }

  const toggleRoleDrawer = () => setaddRoleOpen(!addRoleOpen)
  const togglePermissions = () => setPermissions(!openPermissions)
  const toggleEditModal = () => setEditModal(!editModal)

  const setRoleEdit = role => {
    setEditModal(true)
    setSelectedRole(role)
  }

  const cancelEditMode = () => {
    setEditModal(false)
    setSelectedRole(null)
    toggleEditModal()
  }

  const ondeleteClick = () => {
    dispatch(deleteRole(selectedRole))
    doCancelDelete()
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSelectedRole(null)
    updateFetch()
  }

  const doDelete = value => {
    setDeleteModal(true)
    setSelectedRole(value?.id)
  }

  const updatePermission = () => {
    setPermissions(true)
  }

  const renderClient = row => {
    const initials = `${formatFirstLetter(row?.firstname)} ${formatFirstLetter(row?.lastname)}`
    if (row?.image?.length) {
      return (
        <CustomAvatar src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${row?.image}`} sx={{ width: 38, height: 38 }} />
      )
    } else {
      return (
        <CustomAvatar
          skin='light'
          color={row?.id % 2 === 0 ? 'primary' : 'secondary'}
          sx={{ width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
        >
          {getInitials(initials || 'John Doe')}
        </CustomAvatar>
      )
    }
  }

  useEffect(() => {
    dispatch(fetchRoles({ page: page + 1, limit: 10 }))
    dispatch(fetchPermissions())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, refetch])

  const renderCards = () =>
    RolesData?.map((role, i) => {
      return (
        <Grid key={role?.id} item xs={12} sm={6} lg={4}>
          <Card
            sx={{
              m: theme => theme.spacing(2),
              p: theme => theme.spacing(6)
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>Total {role?.user?.length} Staff</Typography>
              {role?.user?.length === 0 && (
                <CustomAvatar
                  skin='light'
                  color={role?.id % 2 === 0 ? 'primary' : 'info'}
                  sx={{
                    ml: 'auto',
                    width: 43,
                    height: 43,
                    fontWeight: 500,
                    fontSize: theme => theme.typography.body1.fontSize
                  }}
                >
                  <Icon icon='tabler:user-plus' />
                </CustomAvatar>
              )}
              <AvatarGroup className='pull-up' max={role?.user?.length}>
                {role?.user?.map(user => (
                  <Tooltip key={user?.id} title={formatFirstLetter(user?.lastname)}>
                    {renderClient(user)}
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Box>
            <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
              <Box>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 500 }}>{formatFirstLetter(role?.name)}</Typography>
                <Typography
                  sx={{ color: 'primary.main', textDecoration: 'none', cursor: 'pointer' }}
                  onClick={e => {
                    e.preventDefault()
                    updatePermission()
                    setDialogTitle('Edit')
                  }}
                >
                  Permissions
                </Typography>
              </Box>

              <Box sx={{ alignSelf: 'end' }}>
                <CustomAvatar skin='light' color={2 % 2 === 0 ? 'primary' : 'secondary'}>
                  <IconButton size='small' onClick={event => handleRowOptionsClick(event, i)}>
                    <Icon icon='tabler:dots-vertical' />
                    {/* <Icon icon='tabler:settings' /> */}
                  </IconButton>
                  <Menu
                    keepMounted
                    anchorEl={anchorEl[i]}
                    open={Boolean(anchorEl[i])}
                    onBlur={() => handleRowOptionsClose(i)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    PaperProps={{ style: { minWidth: '8rem' } }}
                  >
                    <MenuItem onClick={() => setRoleEdit(role)} sx={{ '& svg': { mr: 2 } }}>
                      <Icon icon='tabler:edit' fontSize={20} />
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => doDelete(role)} sx={{ '& svg': { mr: 2 } }}>
                      <Icon icon='fluent:delete-24-regular' fontSize={20} />
                      Delete
                    </MenuItem>
                  </Menu>
                </CustomAvatar>
              </Box>
            </Stack>
          </Card>
        </Grid>
      )
    })

  return (
    <Grid container sx={{ mb: 5 }}>
      {renderCards()}
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{
            m: theme => theme.spacing(2),
            pt: theme => theme.spacing(6),
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-end'
          }}
        >
          <Box
            sx={{
              height: '100%',
              minHeight: 135,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}
          >
            <img height={122} alt='add-role' src='/images/pages/add-new-role-illustration.png' />
          </Box>
          <Stack sx={{ display: 'flex', justifyContent: 'end', alignItems: 'end', alignSelf: 'center' }}>
            <PageHeader action='Add New Role' toggle={toggleRoleDrawer} />
            <Typography sx={{ mt: 4 }}>Add a role if it doesn't exist</Typography>
          </Stack>
        </Card>
      </Grid>

      {addRoleOpen && <CreateRole open={addRoleOpen} closeModal={toggleRoleDrawer} refetchRoles={updateFetch} />}
      {editModal && (
        <EditRole open={editModal} closeModal={cancelEditMode} refetchRoles={updateFetch} selectedRole={selectedRole} />
      )}
      {openPermissions && (
        <Permissions open={updatePermission} closeModal={togglePermissions} dialogTitle={dialogTitle} />
      )}
      <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />
    </Grid>
  )
}

export default RoleCard
