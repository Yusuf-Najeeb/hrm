// ** React Imports
import React, { useState, useEffect } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomChip from 'src/@core/components/mui/chip'
import { getInitials } from 'src/@core/utils/get-initials'
import { formatFirstLetter, formatCurrency } from '../../../@core/utils/format'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import PlanInfo from './PlanInfo'

const ProfileCard = ({ staff }) => {
  const [profilePictureUrl, setProfilePictureUrl] = useState()

  const initials = `${formatFirstLetter(staff?.firstname)} ${formatFirstLetter(staff?.lastname)}`

  useEffect(() => {
    setProfilePictureUrl(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${staff?.image}`)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilePictureUrl])

  return (
    <Stack>
      <Card>
        <CardContent>
          <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box>
              {staff?.image ? (
                <CustomAvatar
                  src={staff?.image ? profilePictureUrl : '/images/avatars/14.png'}
                  variant='rounded'
                  alt={`${formatFirstLetter(staff?.firstname)} ${formatFirstLetter(staff?.lastname)}`}
                  sx={{ width: 100, height: 100, mb: 4 }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  color={2 % 2 === 0 ? 'primary' : 'secondary'}
                  sx={{
                    mr: 2.5,
                    width: 100,
                    height: 100,
                    fontWeight: 500,

                    // fontSize: theme => theme.typography.body1.fontSize
                    fontSize: '2rem'
                  }}
                >
                  {getInitials(initials || 'John Doe')}
                </CustomAvatar>
              )}
            </Box>
            <Typography sx={{ my: 2 }}>{`${staff?.firstname} ${staff?.lastname}` || '--'}</Typography>
            <CustomChip rounded size='small' skin='light' color='success' label={`${staff?.role}` || 'staff'} />
          </Stack>
          <Divider sx={{ mt: theme => theme.spacing(4), mb: theme => theme.spacing(2) }} />
          <Stack>
            <Typography sx={{ color: 'secondary', fontSize: '.85rem' }}>Details</Typography>
            <Stack direction={'row'} spacing={4} sx={{ mb: 2 }}>
              <Typography>Username:</Typography>
              <Typography>{staff?.username || '--'}</Typography>
            </Stack>
            <Stack direction={'row'} spacing={4} sx={{ mb: 2 }}>
              <Typography>Email:</Typography>
              <Typography>{staff?.email || '--'}</Typography>
            </Stack>
            <Stack direction={'row'} spacing={4} sx={{ mb: 2 }}>
              <Typography>Role:</Typography>
              <Typography>{staff?.role || '--'}</Typography>
            </Stack>
            <Stack direction={'row'} spacing={4} sx={{ mb: 2 }}>
              <Typography>Status:</Typography>
              <Typography>{staff?.status || '--'}</Typography>
            </Stack>
            <Stack direction={'row'} spacing={4} sx={{ mb: 2 }}>
              <Typography>Phone:</Typography>
              <Typography>{staff?.phone || '--'}</Typography>
            </Stack>
            <Stack direction={'row'} spacing={4} sx={{ mb: 2 }}>
              <Typography>Department:</Typography>
              <Typography>{staff?.department || '--'}</Typography>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', mx: 'auto' }}>
          <Button variant='contained'>Edit</Button>
          <Button variant='tonal' color='error'>
            Suspend
          </Button>
        </CardActions>
      </Card>

      <PlanInfo />
    </Stack>
  )
}

export default ProfileCard
