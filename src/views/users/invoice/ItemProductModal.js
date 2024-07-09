//** React Imports
import React, { Fragment, useContext, useState, useEffect } from 'react'
import ModalContext from './ModalContext'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

//** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

//** Component Imports
import AddProduct from './AddProduct'
import AddService from './AddService'

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

const ItemProduct = () => {
  const { itemProductModalOpen, setItemProductModalOpen, setAddProductModalOpen, setAddServiceModalOpen } =
    useContext(ModalContext)

  const closeModal = () => {
    setItemProductModalOpen(false)
  }

  const openProductModal = () => {
    setAddProductModalOpen(true)
    closeModal()
  }

  const openServiceModal = () => {
    setAddServiceModalOpen(true)
    closeModal()
  }

  return (
    <Fragment>
      <Dialog
        open={itemProductModalOpen}
        fullWidth
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
            <CustomCloseButton onClick={closeModal}>
              <Icon icon='tabler:x' fontSize='1.25rem' />
            </CustomCloseButton>
            <Typography sx={{ textAlign: 'left', fontSize: '1.25rem', my: 4 }}>Select</Typography>
            <Grid container spacing={4}>
              <Grid item xs={6} sm={6}>
                <Stack direction='column' alignItems='center' justifyContent='center'>
                  <Icon icon='fluent-mdl2:product-variant' fontSize={100} />
                  <Button variant='tonal' sx={{ my: theme => theme.spacing(4) }} onClick={openProductModal}>
                    Product
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={6} sm={6}>
                <Stack direction='column' alignItems='center' justifyContent='center'>
                  <Icon icon='ep:service' fontSize={100} />
                  <Button variant='tonal' sx={{ my: theme => theme.spacing(4) }} onClick={openServiceModal}>
                    Service
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
        </form>
      </Dialog>
      <AddProduct />
      <AddService />
    </Fragment>
  )
}

export default ItemProduct
