// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
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

const SubscriptionAlert = () => {
  const [userInput, setUserInput] = useState('yes')

  return (
    <Dialog fullWidth maxWidth='xs' open={secondDialogOpen} onClose={handleSecondDialogClose}>
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(6)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            '& svg': {
              mb: 8,
              color: userInput === 'yes' ? 'success.main' : 'error.main'
            }
          }}
        >
          <Icon fontSize='5.5rem' icon={userInput === 'yes' ? 'tabler:circle-check' : 'tabler:circle-x'} />
          <Typography variant='h4' sx={{ mb: 5 }}>
            {userInput === 'yes' ? 'Unsubscribed!' : 'Cancelled'}
          </Typography>
          <Typography>
            {userInput === 'yes' ? 'Your subscription cancelled successfully.' : 'Unsubscription Cancelled!!'}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Button variant='contained' color='success' onClick={handleSecondDialogClose}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SubscriptionAlert
