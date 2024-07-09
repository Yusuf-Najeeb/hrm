//** React Imports
import React, { useContext, useState } from 'react'
import ModalContext from './ModalContext'
import ItemProductModal from './ItemProductModal'

//** Third-Party Imports
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

//** Icon Imports
import Icon from 'src/@core/components/icon'

//** Utils & Component Imports
import { CustomInput } from '../duty-roster/UploadRosterDialog'
import { styled, useTheme } from '@mui/material/styles'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import { yupResolver } from '@hookform/resolvers/yup'
import { memoSchema } from 'src/@core/FormSchema'
import { useStaffs } from '../../../hooks/useStaffs'

//** MUI Imports
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'

// import SelectItemProduct from './ItemProductModal'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const defaultValues = {
  customer: '',
  invoiceNumber: '',
  issueDate: '',
  dueDate: '',
  reference: ''
}

const NewInvoice = ({ open, closeCanvas }) => {
  const { invoiceDrawerOpen, setInvoiceDrawerOpen } = useContext(ModalContext)

  const closeDrawer = () => {
    setInvoiceDrawerOpen(false)
  }

  // const [StaffsData] = useStaffs()
  // const theme = useTheme()

  const {
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(memoSchema)
  })

  // const openItemProductModal = () => setItemProductModal(true)
  // const toggleModal = () => setItemProductModal(!itemProductModal)

  return (
    <Drawer
      open={invoiceDrawerOpen}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 600, sm: 1000 } } }}
    >
      <Header>
        <Typography variant='h4'>Create New Invoice</Typography>
        <IconButton
          size='small'
          onClick={closeDrawer}
          sx={{
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 3, 3) }}>
        <form

        //  onSubmit={handleSubmit(handleDeductions)}
        >
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)}  !important`,
              px: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(8)} !important`]
            }}
          >
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='customer'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      select
                      value={value}
                      label='Customer'
                      placeholder='Select Customer'
                      onChange={onChange}
                      error={Boolean(errors?.customer)}
                      aria-describedby='stepper-linear-account-userId'
                      {...(errors?.customer && { helperText: errors?.customer.message })}
                    >
                      <MenuItem>Select Customer</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='invoiceNumber'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Invoice Number'
                      placeholder='1234567890'
                      onChange={onChange}
                      error={Boolean(errors?.invoiceNumber)}
                      aria-describedby='stepper-linear-account-userId'
                      {...(errors?.invoiceNumber && { helperText: errors?.invoiceNumber.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name='issueDate'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selected={value}
                      dateFormat='yyyy-MM-dd'
                      popperPlacement='bottom-end'
                      onChange={e => {
                        onChange(e)
                      }}
                      placeholderText='YYYY-MM-DD'
                      customInput={
                        <CustomInput
                          value={value}
                          onChange={onChange}
                          autoComplete='off'
                          label='Date Issued'
                          error={Boolean(errors?.issueDate)}
                          {...(errors?.issueDate && { helperText: errors?.issueDate.message })}
                        />
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name='Due Date'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selected={value}
                      dateFormat='yyyy-MM-dd'
                      popperPlacement='bottom-end'
                      onChange={e => {
                        onChange(e)
                      }}
                      placeholderText='YYYY-MM-DD'
                      customInput={
                        <CustomInput
                          value={value}
                          onChange={onChange}
                          autoComplete='off'
                          label='Due Date'
                          error={Boolean(errors?.dueDate)}
                          {...(errors?.dueDate && { helperText: errors?.dueDate.message })}
                        />
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name='reference'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Reference'
                      placeholder='Reference'
                      onChange={onChange}
                      error={Boolean(errors?.reference)}
                      aria-describedby='stepper-linear-account-userId'
                      {...(errors?.reference && { helperText: errors?.reference.message })}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />

          <DialogContent sx={{ my: theme => theme.spacing(4) }}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={12}>
                <TableContainer>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell align={'left'}>Item</TableCell>
                        <TableCell align={'left'}>Quantity</TableCell>
                        <TableCell align={'left'}>Price</TableCell>
                        <TableCell align={'left'}>VAT</TableCell>
                        <TableCell align={'left'}>Amount</TableCell>
                        <TableCell align={'left'}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Content</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
                <Button
                  variant='tonal'
                  color='error'

                  // onClick={handleOpenItemProductModal}

                  //  onClick={openItemProductModal}
                >
                  Add Item
                  <Icon icon='mdi:plus' fontSize={20} />
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />

          <DialogContent>Preview Stays here</DialogContent>
          <Divider />

          <DialogActions
            sx={{
              justifyContent: 'end',
              pl: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
              mt: theme => [`${theme.spacing(4)} !important`]
            }}
          >
            <Button type='button' variant='tonal' color='secondary' onClick={closeDrawer}>
              Cancel
            </Button>
            <Button type='submit' variant='contained' sx={{ mr: 2 }}>
              {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Box>
      {/* {activeModal === 'itemProduct' && <ItemProductModal />} */}
      {/* <SelectItemProduct open={itemProductModal} close={toggleModal} /> */}
    </Drawer>
  )
}

export default NewInvoice
