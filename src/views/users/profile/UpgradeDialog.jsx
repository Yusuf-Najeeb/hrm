// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'
import UserSuspendDialog from 'src/views/apps/user/view/UserSuspendDialog'
import UserSubscriptionDialog from 'src/views/apps/user/view/UserSubscriptionDialog'
import { styled } from '@mui/material/styles'
import { fontSize } from '@mui/system'

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

const UpgradeDialog = ({ open, close }) => {
  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth='md'
      scroll='body'
      onClose={close}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', maxWidth: 680 } }}
    >
      <DialogContent
        sx={{
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <CustomCloseButton onClick={close}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </CustomCloseButton>
        <DialogTitle
          id='user-view-plans'
          sx={{
            textAlign: 'center',
            fontSize: '1.625rem !important'
          }}
        >
          Upgrade Plan
        </DialogTitle>

        <DialogContent
          sx={{ display: 'flex', flexFlow: 'column', gap: 3, justifyContent: 'center', alignItems: 'center' }}
        >
          <Box sx={{ mr: 3, display: 'flex', ml: 2.4, position: 'relative' }}>
            <Sup>$</Sup>
            <Typography variant='h1' sx={{ mb: -1.2, color: 'primary.main', fontSize: '3rem !important' }}>
              99
            </Typography>
            <Sub>/ month</Sub>
          </Box>
          <CustomChip
            sx={{ fontSize: '1rem', py: theme => theme.spacing(4), px: theme => theme.spacing(6) }}
            rounded
            label='Popular'
            size='small'
            color='primary'
            skin='light'
          />
        </DialogContent>

        <Divider sx={{ m: '0 !important' }} />

        <DialogContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: ['wrap', 'nowrap']
          }}
        >
          <CustomTextField select fullWidth label='Choose Plan' defaultValue='Standard' sx={{ mr: [0, 3], mb: [3, 0] }}>
            <MenuItem value='Basic'>Basic - $0/month</MenuItem>
            <MenuItem value='Standard'>Standard - $99/month</MenuItem>
            <MenuItem value='Enterprise'>Enterprise - $499/month</MenuItem>
            <MenuItem value='Company'>Company - $999/month</MenuItem>
          </CustomTextField>
          <Button variant='contained' sx={{ minWidth: ['100%', 0], mt: 4 }}>
            Upgrade
          </Button>
        </DialogContent>

        {/* <DialogContent>
          <Typography variant='h6' sx={{ mb: 2, color: theme => theme.palette.text.secondary }}>
            User current plan is standard plan
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: ['wrap', 'nowrap'],
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ mr: 3, display: 'flex', ml: 2.4, position: 'relative' }}>
              <Sup>$</Sup>
              <Typography variant='h1' sx={{ mb: -1.2, color: 'primary.main', fontSize: '3rem !important' }}>
                99
              </Typography>
              <Sub>/ month</Sub>
            </Box>
            <Button color='error' variant='tonal' sx={{ mt: 2 }} onClick={() => setSubscriptionDialogOpen(true)}>
              Cancel Subscription
            </Button>
          </Box>
        </DialogContent> */}
      </DialogContent>
    </Dialog>
  )
}

export default UpgradeDialog
