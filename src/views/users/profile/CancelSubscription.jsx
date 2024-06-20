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

const CancelSubscription = ({ open, close, userValue }) => {
  const [userInput, setUserInput] = useState('yes')

  const handleConfirmation = value => {
    console.log(value)
    setUserInput(value)
    console.log(userInput, 'User did')
  }

  return (
    <Dialog fullWidth maxWidth='xs' open={open} onClose={close}>
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
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            '& svg': { mb: 6, color: 'warning.main' }
          }}
        >
          <Icon icon='tabler:alert-circle' fontSize='5.5rem' />
          <Typography>Are you sure you would like to cancel your subscription?</Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Button variant='contained' sx={{ mr: 2 }} onClick={() => handleConfirmation('yes')}>
          Yes
        </Button>
        <Button variant='tonal' color='secondary' onClick={() => handleConfirmation('cancel')}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CancelSubscription
