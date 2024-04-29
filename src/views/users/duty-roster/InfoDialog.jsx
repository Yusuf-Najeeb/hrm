import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

const InfoDialog = ({ openModal, closeModal }) => {
  const handleClose = () => {
    closeModal()
  }

  return (
    <Dialog open={openModal} onClose={handleClose} aria-labelledby='customized-dialog-title'>
      <DialogTitle sx={{ m: 0, p: 3 }} id='customized-dialog-title'>
        Note!
      </DialogTitle>
      <IconButton
        aria-label='close'
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme => theme.palette.grey[500]
        }}
      >
        <Icon icon='line-md:close-small' fontSize='1.5rem' />
      </IconButton>

      <DialogContent>
        <List>
          <ListItem>You are about to download an XML file.</ListItem>
          <ListItem>The file will include the names and IDs of staff in the chosen department.</ListItem>
          <ListItem>It will also contain the days of the selected month.</ListItem>
          <ListItem>Please refrain from modifying the columns titled "S/N" and "ID."</ListItem>
          <ListItem>
            Each row contains the days of the selected month and should be filled with "Morning/Afternoon/Night or Off
            for each staff member based on their work schedule.
          </ListItem>
          <ListItem>Save and upload to keep track of attendance</ListItem>
        </List>
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={closeModal}>
          Got It{' '}
          <IconButton>
            <Icon icon='mdi:close' />
          </IconButton>
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InfoDialog
