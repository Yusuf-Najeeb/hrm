import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../hooks'
import { formatFirstLetter } from '../../../@core/utils/format'
import { fetchStaffs } from '../../../store/apps/staffs/asyncthunk'
import { useStaffs } from '../../../hooks/useStaffs'
import { fetchRoles } from '../../../store/apps/roles/asyncthunk'
import { useDepartments } from '../../../hooks/useDepartments'
import { useRoles } from '../../../hooks/useRoles'
import { getInitials } from 'src/@core/utils/get-initials'
import Icon from 'src/@core/components/icon'
import PageHeader from '../components/PageHeader'
import CreateRole from './CreateRole'

// MUI Imports
import { Grid, Card, Box, Typography, Stack } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import AvatarGroup from '@mui/material/AvatarGroup'
import CustomAvatar from 'src/@core/components/mui/avatar'

const RoleCard = ({ department }) => {
  const dispatch = useAppDispatch()
  const [DepartmentsData] = useDepartments()
  const [StaffsData] = useStaffs()
  const [RolesData] = useRoles()
  const [addRoleOpen, setaddRoleOpen] = useState(false)
  const [refetch, setFetch] = useState(false)

  const toggleRoleDrawer = () => setaddRoleOpen(!addRoleOpen)
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
    dispatch(fetchRoles({ page: 1, limit: 10 }))
    dispatch(fetchStaffs())
  }, [dispatch, refetch])

  return (
    <Grid container sx={{ mb: 5 }}>
      {RolesData?.map(role => {
        return (
          <Grid key={role?.id} item xs={6} sm={4}>
            <Card
              sx={{
                m: theme => theme.spacing(2),
                p: theme => theme.spacing(6)
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Total {StaffsData.length} users</Typography>
                <AvatarGroup className='pull-up' max={StaffsData.length}>
                  {StaffsData?.map((staff, index) => (
                    <Tooltip key={staff?.id} title={staff?.lastname}>
                      {renderClient(staff)}
                    </Tooltip>
                  ))}
                </AvatarGroup>
              </Box>
              <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
                <Box>
                  <Typography sx={{ fontSize: '1.3rem', fontWeight: 500 }}>{formatFirstLetter(role?.name)}</Typography>
                  <Typography>Edit Role</Typography>
                </Box>
                <CustomAvatar skin='light' color={2 % 2 === 0 ? 'primary' : 'secondary'}>
                  <Icon icon='tabler:settings' />
                </CustomAvatar>
              </Stack>
            </Card>
          </Grid>
        )
      })}
      <Grid item xs={6} sm={4}>
        <Card
          sx={{
            m: theme => theme.spacing(2),
            p: theme => theme.spacing(6)
          }}
        >
          <Stack sx={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
            <PageHeader action='Add New Role' toggle={toggleRoleDrawer} />
            <Typography sx={{ mt: 4 }}>Add a role if it doesn't exist</Typography>
          </Stack>
        </Card>
      </Grid>
      {addRoleOpen && <CreateRole open={addRoleOpen} closeModal={toggleRoleDrawer} refetchRoles={updateFetch} />}
    </Grid>
  )
}

export default RoleCard
