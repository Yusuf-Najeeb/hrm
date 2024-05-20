// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
// import EditStaffCard from './EditStaffCard'
import { formatFirstLetter, formatCurrency } from '../../../@core/utils/format'
import { getInitials } from 'src/@core/utils/get-initials'
import StaffDetailCard from '../components/StaffDetailCard'

const roleColors = {
  admin: 'error',
  staff: 'info',

  maintainer: 'success',
  subscriber: 'primary'
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

const StaffCard = ({ Staff, hasUploadedImage, setHasUploadedImage, closeViewStaffCanvas }) => {
  // ** States
  const [openEdit, setOpenEdit] = useState(false)

  // const [profilePictureUrl, setProfilePictureUrl] = useState(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${Staff?.image}`);
  const [profilePictureUrl, setProfilePictureUrl] = useState()

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  useEffect(() => {
    setProfilePictureUrl(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${Staff?.image}`)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilePictureUrl])
  const initials = `${formatFirstLetter(Staff?.firstname)} ${formatFirstLetter(Staff?.lastname)}`

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Fragment>
          <CardContent sx={{ pb: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <Box sx={{ pt: 0, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {Staff?.image ? (
                <CustomAvatar
                  src={Staff?.image ? profilePictureUrl : '/images/avatars/14.png'}
                  variant='rounded'
                  alt={`${formatFirstLetter(Staff?.firstname)} ${formatFirstLetter(Staff?.lastname)}`}
                  sx={{ width: 100, height: 100, mb: 4 }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  color={Staff.id % 2 === 0 ? 'primary' : 'secondary'}
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

              <Typography variant='h5' sx={{ mb: 3 }}>
                {`${formatFirstLetter(Staff?.firstname)} ${formatFirstLetter(Staff?.lastname)}` || '--'}
              </Typography>
              {/* <CustomChip
                rounded
                skin='light'
                size='small'
                label='Admin'
                color={roleColors['admin']}
                sx={{ textTransform: 'capitalize' }}
              /> */}
            </Box>
            <Box sx={{ display: 'flex', position: 'relative' }}>
              <Typography variant='h5' sx={{ mt: -1, mb: -1.2, color: 'primary.main', fontSize: '2rem !important' }}>
                {formatCurrency(Staff?.grossSalary, true)}
                <Sub>/ month</Sub>
              </Typography>
            </Box>
          </CardContent>

          <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                  <Icon fontSize='1.75rem' icon='fluent-mdl2:date-time-2' />
                </CustomAvatar>
                <div>
                  <Typography variant='body2'>Date Joined</Typography>
                  <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                    {formatDate(Staff?.joinDate) || 'No available date'}
                  </Typography>
                </div>
              </Box> */}
              {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                    <Icon fontSize='1.75rem' icon='tabler:briefcase' />
                  </CustomAvatar>
                  <div>
                    <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>568</Typography>
                    <Typography variant='body2'>Project Done</Typography>
                  </div>
                </Box> */}
            </Box>
          </CardContent>

          <Divider sx={{ my: '0 !important', mx: 6 }} />

          <CardContent sx={{ pb: 4 }}>
            <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase', fontSize: '1rem' }}>
              Details
            </Typography>
            <Box sx={{ pt: 4 }}>
              <StaffDetailCard
                iconName='solar:user-broken'
                cardTitle='Name'
                value={`${formatFirstLetter(Staff?.firstname)} ${formatFirstLetter(Staff?.lastname)}` || '--'}
              />
              <StaffDetailCard iconName='fontisto:email' cardTitle='Email' value={Staff?.email || '--'} />
              <StaffDetailCard iconName='solar:user-broken' cardTitle='Username' value={Staff?.username || '--'} />
              <StaffDetailCard iconName='bi:phone' cardTitle='Phone Number' value={Staff?.phone || '--'} />
              <StaffDetailCard iconName='la:user-tag' cardTitle='Designation' value={Staff?.designation || '--'} />
              <StaffDetailCard
                iconName='fluent-emoji-high-contrast:department-store'
                cardTitle='Department'
                value={Staff?.department?.name || '--'}
              />
              <StaffDetailCard iconName='tabler:user-pin' cardTitle='Address' value={Staff?.address || '--'} />
            </Box>
          </CardContent>

          <CardContent sx={{ pb: 4 }}>
            <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase', fontSize: '1rem' }}>
              Account and Retirement Details
            </Typography>
            <Box sx={{ pt: 4 }}>
              <StaffDetailCard
                iconName='solar:wallet-money-bold'
                cardTitle='Account Number'
                value={Staff?.accountNumber || '--'}
              />
              <StaffDetailCard
                iconName='solar:wallet-money-bold'
                cardTitle='RSA Number'
                value={Staff?.rsaNumber || '--'}
              />
              <StaffDetailCard
                iconName='ri:home-office-fill'
                cardTitle='RSA Company'
                value={Staff?.rsaCompany || '--'}
              />
            </Box>
          </CardContent>

          <Divider sx={{ my: '0 !important', mx: 6 }} />

          <CardContent sx={{ pb: 4 }}>
            <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase', fontSize: '1rem' }}>
              Next of Kin Details
            </Typography>
            <Box sx={{ pt: 4 }}>
              <StaffDetailCard iconName='solar:user-broken' cardTitle='Title' value={Staff?.userNOK?.title || '--'} />
              <StaffDetailCard
                iconName='gg:rename'
                cardTitle='Name'
                value={`${Staff?.userNOK?.firstname} ${Staff?.userNOK?.lastname}` || '--'}
              />
              <StaffDetailCard iconName='ic:baseline-email' cardTitle='Email' value={Staff?.userNOK?.email || '--'} />
              <StaffDetailCard iconName='bi:phone' cardTitle='Phone number' value={Staff?.userNOK?.phone || '--'} />
              <StaffDetailCard
                iconName='ri:home-office-fill'
                cardTitle='Address'
                value={Staff?.userNOK?.address || '--'}
              />
              <StaffDetailCard
                iconName='fluent-mdl2:family'
                cardTitle='Relationship'
                value={Staff?.userNOK?.relationship || '--'}
              />
            </Box>
          </CardContent>

          {/* <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant='contained'
              sx={{ mr: 2 }}
              onClick={handleEditClickOpen}
              // onClick={()=> console.log('view staff')}
              startIcon={<Icon icon='tabler:edit' />}
            >
              Edit
            </Button>
          </CardActions> */}

          {/* <EditStaffCard
            openEdit={openEdit}
            handleEditClose={handleEditClose}
            data={Staff}
            hasUploadedImage={hasUploadedImage}
            profilePictureUrl={profilePictureUrl}
            closeViewStaffCanvas={closeViewStaffCanvas}
            setProfilePictureUrl={setProfilePictureUrl}
            setHasUploadedImage={setHasUploadedImage}
          /> */}
        </Fragment>
      </Grid>
    </Grid>
  )
}

export default StaffCard
