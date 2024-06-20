import React, { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CustomChip from 'src/@core/components/mui/chip'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Component Imports
import { formatCurrency } from '../../../@core/utils/format'
import { fontSize } from '@mui/system'
import { styled } from '@mui/material/styles'
import LinearProgress from '@mui/material/LinearProgress'
import UpgradeDialog from './UpgradeDialog'

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

const PlanInfo = () => {
  // ** States
  const [openEdit, setOpenEdit] = useState(false)
  const [openPlans, setOpenPlans] = useState(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false)

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)

  return (
    <Card sx={{ my: theme => theme.spacing(8) }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CustomChip
          rounded
          size='small'
          skin='light'
          color='primary'
          label='Basic'
          sx={{ p: theme => theme.spacing(4), fontSize: theme => theme.typography.body1.fontSize }}
        />
        <Box sx={{ mr: 3, display: 'flex', ml: 2.4, position: 'relative' }}>
          <Sup>$</Sup>
          <Typography variant='h1' sx={{ mb: -1.2, color: 'primary.main', fontSize: '2rem !important' }}>
            9.99
          </Typography>
          <Sub>/ month</Sub>
        </Box>
      </CardContent>
      <CardContent>
        <Box sx={{ mt: 2.5, mb: 4 }}>
          <Box sx={{ display: 'flex', mb: 2, alignItems: 'center', '& svg': { mr: 2, color: 'text.secondary' } }}>
            <Icon icon='tabler:point' fontSize='1.125rem' />
            <Typography sx={{ color: 'text.secondary' }}>10 Users</Typography>
          </Box>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', '& svg': { mr: 2, color: 'text.secondary' } }}>
            <Icon icon='tabler:point' fontSize='1.125rem' />
            <Typography sx={{ color: 'text.secondary' }}>Up to 10GB storage</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2, color: 'text.secondary' } }}>
            <Icon icon='tabler:point' fontSize='1.125rem' />
            <Typography sx={{ color: 'text.secondary' }}>Basic Support</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', mb: 1.5, justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: 500 }}>Days</Typography>
          <Typography sx={{ fontWeight: 500 }}>75% Completed</Typography>
        </Box>
        <LinearProgress value={75} variant='determinate' sx={{ height: 10 }} />
        <Typography sx={{ mt: 1.5, mb: 6, color: 'text.secondary' }}>4 days remaining</Typography>
        <Button fullWidth variant='contained' onClick={handlePlansClickOpen}>
          Upgrade Plan
        </Button>
      </CardContent>
      <UpgradeDialog open={openPlans} close={handlePlansClose} />
    </Card>
  )
}

export default PlanInfo
