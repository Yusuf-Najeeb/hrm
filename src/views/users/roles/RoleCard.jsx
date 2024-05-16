// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** Custom Component Import
import { useAppDispatch } from '../../../hooks'
import { formatFirstLetter } from '../../../@core/utils/format'
import { fetchStaffs } from '../../../store/apps/staffs/asyncthunk'
import { useStaffs } from '../../../hooks/useStaffs'
import { fetchRoles } from '../../../store/apps/roles/asyncthunk'
import { useDepartments } from '../../../hooks/useDepartments'
import { useRoles } from '../../../hooks/useRoles'
import { getInitials } from 'src/@core/utils/get-initials'
import PageHeader from '../components/PageHeader'
import CreateRole from './CreateRole'

// ** Icon Import
import Icon from 'src/@core/components/icon'

// ** MUI Imports
import { Grid, Card, Box, Typography, Stack } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import AvatarGroup from '@mui/material/AvatarGroup'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Permissions from './Permissions'

const RoleCard = () => {
  const [page, setPage] = useState(0)
  const [addRoleOpen, setaddRoleOpen] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [openPermissions, setPermissions] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('Add')

  // * Hooks
  const dispatch = useAppDispatch()
  const [DepartmentsData] = useDepartments()
  const [StaffsData] = useStaffs()
  const [RolesData] = useRoles()

  const toggleRoleDrawer = () => setaddRoleOpen(!addRoleOpen)
  const togglePermissions = () => setPermissions(!openPermissions)

  const updatePermission = () => {
    setPermissions(true)
  }
  const updateFetch = () => setFetch(!refetch)

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
    dispatch(fetchStaffs())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, refetch])

  const renderCards = () =>
    RolesData?.map(role => {
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
                  color={role?.id % 2 === 0 ? 'primary' : 'success'}
                  sx={{
                    ml: 'auto',
                    width: 40,
                    height: 40,
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
                  Edit Role
                </Typography>
              </Box>
              <CustomAvatar skin='light' color={2 % 2 === 0 ? 'primary' : 'secondary'}>
                <Icon icon='tabler:settings' />
              </CustomAvatar>
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

      {openPermissions && (
        <Permissions open={updatePermission} closeModal={togglePermissions} dialogTitle={dialogTitle} />
      )}
    </Grid>
  )
}

export default RoleCard
