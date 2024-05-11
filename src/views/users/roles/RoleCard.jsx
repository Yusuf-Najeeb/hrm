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

const RoleCard = ({ department }) => {
  const [page, setPage] = useState(0)
  const [addRoleOpen, setaddRoleOpen] = useState(false)
  const [refetch, setFetch] = useState(false)

  // * Hooks
  const dispatch = useAppDispatch()
  const [DepartmentsData] = useDepartments()
  const [StaffsData] = useStaffs()
  const [RolesData] = useRoles()
  console.log(RolesData)

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
    dispatch(fetchRoles({ page: page + 1, limit: 10 }))
    dispatch(fetchStaffs())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, refetch])

  return (
    <Grid container sx={{ mb: 5 }}>
      {RolesData?.map(role => {
        return (
          <Grid key={role?.id} item xs={12} sm={6} lg={4}>
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
                  <Typography
                    href='#'
                    component={Link}
                    sx={{ color: 'primary.main', textDecoration: 'none' }}

                    // onClick={e => {
                    //   e.preventDefault()
                    //   handleClickOpen()
                    //   setDialogTitle('Edit')
                    // }}
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
      })}
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{
            m: theme => theme.spacing(2),
            pt: theme => theme.spacing(5),
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-end'
          }}
        >
          <Box
            sx={{
              height: '100%',
              minHeight: 140,
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
    </Grid>
  )
}

export default RoleCard
