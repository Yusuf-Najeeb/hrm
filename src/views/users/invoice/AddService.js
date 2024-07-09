// ** React Imports
import React, { Fragment, useContext, useState } from 'react'
import ModalContext from './ModalContext'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Utils & Components Imports
import CustomTextField from 'src/@core/components/mui/text-field'

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

const AddService = () => {
  const [value, setValue] = useState('')
  const { addServiceModalOpen, setAddServiceModalOpen } = useContext(ModalContext)

  const closeServiceModal = () => {
    setAddServiceModalOpen(false)
  }

  return (
    <Fragment>
      <Dialog
        fullWidth
        open={addServiceModalOpen}
        maxWidth='sm'
        scroll='body'
        sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', maxWidth: 550 } }}
      >
        <form>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(8)} !important`]
            }}
          >
            <CustomCloseButton onClick={closeServiceModal}>
              <Icon icon='tabler:x' fontSize='1.25rem' />
            </CustomCloseButton>

            <Typography sx={{ textAlign: 'left', fontSize: '1.25rem', my: 4 }}>Select Service</Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12}>
                <CustomTextField
                  fullWidth
                  value={value}
                  placeholder='Search Product'
                  onChange={e => handleFilter(e.target.value)}
                />
              </Grid>

              <Typography sx={{ textAlign: 'left', fontSize: '1.25rem', my: 4, ml: 4 }}>
                Preview Selected Item
              </Typography>

              <Grid item xs={12} sm={12}>
                <Button variant='tonal' sx={{ my: theme => theme.spacing(4) }}>
                  <Icon icon='tabler:plus' fontSize={20} />
                  Add New Service
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </form>
      </Dialog>
    </Fragment>
  )
}

export default AddService
