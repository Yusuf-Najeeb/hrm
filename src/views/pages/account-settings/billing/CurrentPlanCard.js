// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
import AlertTitle from '@mui/material/AlertTitle'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import LinearProgress from '@mui/material/LinearProgress'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Component Import
import PricingPlans from 'src/views/pages/pricing/PricingPlans'
import UpgradeDialog from '../../../users/profile/UpgradeDialog'
import CancelSubscription from '../../../users/profile/CancelSubscription'

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const CurrentPlanCard = ({ data }) => {
  // ** State
  const [open, setOpen] = useState(false)
  const [secondDialogOpen, setSecondDialogOpen] = useState(false)
  const [openPricingDialog, setOpenPricingDialog] = useState(false)
  const [cancelSubscription, setCancelSubscription] = useState(false)

  const handleClose = () => setOpen(false)
  const handlePricePlan = () => setOpenPricingDialog(false)
  const handleSecondDialogClose = () => setSecondDialogOpen(false)

  const handleConfirmation = value => {
    handleClose()
    setUserInput(value)
    setSecondDialogOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader title='Current Plan' />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography sx={{ mb: 1.5, fontWeight: 500 }}>Your Current Plan is Basic</Typography>
                <Typography sx={{ color: 'text.secondary' }}>A simple start for everyone</Typography>
              </Box>
              <Box sx={{ mb: 4 }}>
                <Typography sx={{ mb: 1.5, fontWeight: 500 }}>Active until Dec 09, 2023</Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  We will send you a notification upon Subscription expiration
                </Typography>
              </Box>
              <div>
                <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 2.5, fontWeight: 500 }}>$199 Per Month</Typography>
                  <CustomChip rounded label='Popular' size='small' color='primary' skin='light' />
                </Box>
                <Typography sx={{ color: 'text.secondary' }}>Standard plan for small to medium businesses</Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <Alert severity='warning' icon={false} sx={{ mb: 4 }}>
                <AlertTitle sx={{ fontWeight: 500 }}>We need your attention!</AlertTitle>
                Your plan requires update
              </Alert> */}

              <div>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 500 }}>Days</Typography>
                  <Typography sx={{ fontWeight: 500 }}>24 of 30 Days</Typography>
                </Box>
                <LinearProgress value={75} variant='determinate' sx={{ my: 1.5, height: 10 }} />
                <Typography sx={{ color: 'text.secondary' }}>
                  6 days remaining until your plan requires update
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap' }}>
                <Button variant='contained' onClick={() => setOpenPricingDialog(true)}>
                  Upgrade Plan
                </Button>
                <Button variant='tonal' color='secondary' onClick={() => setOpen(true)}>
                  Cancel Subscription
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <CancelSubscription open={open} close={handleClose} />
      <UpgradeDialog open={openPricingDialog} close={handlePricePlan} />
    </>
  )
}

export default CurrentPlanCard
