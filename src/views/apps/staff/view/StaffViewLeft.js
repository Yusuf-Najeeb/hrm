// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { Stack } from '@mui/material'

const data = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  billing: 'Manual - Cash',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/14.png'
}

const roleColors = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: 0,
  left: -10,
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')(({ theme }) => ({
  alignSelf: 'flex-end',
  color: theme.palette.text.disabled,
  fontSize: theme.typography.body1.fontSize
}))

const StaffViewLeft = () => {
  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ border: '1px solid #5f58be' }}>
            <CardContent sx={{ pb: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <CustomChip rounded skin='light' size='small' color='primary' label='MEDICAL DIRECTOR' />
            </CardContent>

            <CardContent sx={{ mt: 6 }}>
              <Stack direction='row' spacing={4}>
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={data.avatarColor}
                  sx={{ width: 40, height: 40, mb: 4, fontSize: '1rem', borderRadius: 50 }}
                >
                  {getInitials('Deda Hospital')}
                </CustomAvatar>
                <Box>
                  <Typography variant='h6' sx={{ mb: 3, textTransform: 'uppercase' }}>
                    {'ONUH SUNDAY OMALE'}
                  </Typography>
                  <Typography variant='h6' sx={{ mb: 3, color: 'text.disabled', fontSize: 13 }}>
                    PEN100153116177 | STANBIC IBTC
                  </Typography>
                </Box>
              </Stack>

              <Button fullWidth variant='contained' color='error' onClick={handlePlansClickOpen}>
                Disable Staff
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <Typography
              variant='h6'
              sx={{ mx: 6, my: 4, color: 'text.secondary', textTransform: 'uppercase', fontWeight: 800 }}
            >
              Details
            </Typography>

            <Divider sx={{ my: '0 !important', mx: 6 }} />

            <CardContent sx={{ pb: 4 }}>
              <Box sx={{ mt: 1.5, mb: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    mb: 2,
                    alignItems: 'center',
                    '& svg': { mr: 2, color: 'text.secondary' },
                    justifyContent: 'space-between'
                  }}
                >
                  <Stack direction='row'>
                    <Icon icon='tabler:progress-check' fontSize='1.125rem' />
                    <Typography sx={{ color: 'text.secondary' }}>Employee ID :</Typography>
                  </Stack>
                  <Typography sx={{ color: 'text.secondary' }}>DH001</Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    mb: 2,
                    alignItems: 'center',
                    '& svg': { mr: 2, color: 'text.secondary' },
                    justifyContent: 'space-between'
                  }}
                >
                  <Stack direction='row'>
                    <Icon icon='tabler:progress-check' fontSize='1.125rem' />
                    <Typography sx={{ color: 'text.secondary' }}>Gross Salary :</Typography>
                  </Stack>
                  <Typography sx={{ color: 'text.secondary' }}>₦1,200,000.00</Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    mb: 2,
                    alignItems: 'center',
                    '& svg': { mr: 2, color: 'text.secondary' },
                    justifyContent: 'space-between'
                  }}
                >
                  <Stack direction='row'>
                    <Icon icon='tabler:progress-check' fontSize='1.125rem' />
                    <Typography sx={{ color: 'text.secondary' }}>Account Number :</Typography>
                  </Stack>
                  <Typography sx={{ color: 'text.secondary' }}>1002513534</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default StaffViewLeft
