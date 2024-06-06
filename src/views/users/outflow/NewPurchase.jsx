//** React Imports
import React, { Fragment, useState, useEffect } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

//** Third-Party Imports
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

//** MUI Imports
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// ** Components Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { querySchema } from 'src/@core/FormSchema'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import { CustomInput } from '../duty-roster/UploadRosterDialog'
import { useAppDispatch } from '../../../hooks'
import { formatFirstLetter } from '../../../@core/utils/format'
import { useStaffs } from '../../../hooks/useStaffs'
import { ButtonStyled } from '../../../@core/components/mui/button/ButtonStyledComponent'
import { handleInputImageChange } from '../../../@core/utils/upload'

import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'

const defaultValues = {
  item: '',
  vendor: '',
  referenceNumber: '',
  paymentAccount: '',
  paymentMethod: '',
  price: '',
  quantity: '',
  date: '',
  description: ''
}

const NewPurchase = ({ open, close, updateFetch }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(``)
  const [imageLinkPayload, setImageLinkPayload] = useState('')

  const dispatch = useAppDispatch()
  const [StaffsData] = useStaffs()

  const [dates, setDates] = useState([])

  const {
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(querySchema)
  })

  return (
    <Fragment>
      <Dialog open={open} sx={{ '& .MuiPaper-root': { width: '100%', minWidth: 950 } }}>
        <form

        //  onSubmit={handleSubmit(handleDeductions)}
        >
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(8)} !important`]
            }}
          >
            <Typography sx={{ textAlign: 'left', fontSize: '1.25rem', my: 4 }}>New Inflow</Typography>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    border: theme => `3px dotted ${theme.palette.primary.main}`,
                    borderRadius: 3,
                    p: 3,
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    <input
                      hidden
                      type='file'
                      accept='image/png, image/jpeg'
                      onChange={e => handleInputImageChange(e, setPreviewUrl, setSelectedImage, setImageLinkPayload)}
                      id='account-settings-upload-image'
                    />

                    <Icon icon='tabler:upload' fontSize='1.45rem' />
                  </ButtonStyled>
                  <Typography variant='body2' sx={{ mt: 2 }}>
                    Attach Receipt
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    alignItems: 'center',
                    alignSelf: 'center'
                  }}
                >
                  {selectedImage && (
                    <img
                      src={`${previewUrl}`}
                      width={300}
                      height={100}
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                      alt='student image'
                    />
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name='item'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Product'
                      onChange={onChange}
                      error={Boolean(errors?.item)}
                      aria-describedby='stepper-linear-account-userId'
                      {...(errors?.item && { helperText: errors?.item.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name='vendor'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Vendor'
                      onChange={onChange}
                      error={Boolean(errors?.vendor)}
                      aria-describedby='stepper-linear-account-userId'
                      {...(errors?.vendor && { helperText: errors?.vendor.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name='referenceNumber'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomInput
                      fullWidth
                      value={value}
                      onChange={onChange}
                      label='Reference Number'
                      error={Boolean(errors?.referenceNumber)}
                      {...(errors?.referenceNumber && { helperText: errors?.referenceNumber.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name='price'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomInput
                      fullWidth
                      value={value}
                      onChange={onChange}
                      label='Price'
                      error={Boolean(errors?.price)}
                      {...(errors?.price && { helperText: errors?.price.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name='quantity'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomInput
                      fullWidth
                      value={value}
                      onChange={onChange}
                      label='Quantity'
                      error={Boolean(errors?.quantity)}
                      {...(errors?.quantity && { helperText: errors?.quantity.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name='date'
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
                          label='Date'
                          error={Boolean(errors?.date)}
                          {...(errors?.date && { helperText: errors?.date.message })}
                        />
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='paymentMethod'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomInput
                      select
                      fullWidth
                      value={value}
                      onChange={onChange}
                      label='Payment Method'
                      error={Boolean(errors?.paymentMethod)}
                      {...(errors?.paymentMethod && { helperText: errors?.paymentMethod.message })}
                    >
                      <MenuItem value=''>Select Payment Method</MenuItem>
                      <MenuItem value='Cash on hand'>Cash on hand</MenuItem>
                      <MenuItem value='bank pos'>Bank POS</MenuItem>

                      {/* {periods.map(period => {
                        return (
                          <MenuItem key={period} value={period}>
                            {period}
                          </MenuItem>
                        )
                      })} */}
                    </CustomInput>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='paymentAccount'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomInput
                      select
                      fullWidth
                      value={value}
                      onChange={onChange}
                      label='Payment Account'
                      error={Boolean(errors?.paymentAccount)}
                      {...(errors?.paymentAccount && { helperText: errors?.paymentAccount.message })}
                    >
                      <MenuItem value=''>Select Payment Account</MenuItem>
                      <MenuItem value='zenith bank'>Zenith Bank</MenuItem>
                      <MenuItem value='fcmb bank'>FCMB Bank</MenuItem>

                      {/* {periods.map(period => {
                        return (
                          <MenuItem key={period} value={period}>
                            {period}
                          </MenuItem>
                        )
                      })} */}
                    </CustomInput>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Controller
                  name='description'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      multiline
                      rows={4}
                      label='Description'
                      onChange={onChange}
                      placeholder='Purchase description'
                      error={Boolean(errors.description)}
                      {...(errors.description && { helperText: errors.description.message })}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'end',
              pl: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button type='button' variant='tonal' color='secondary' onClick={close}>
              Cancel
            </Button>
            <Button type='submit' variant='contained' sx={{ mr: 2 }}>
              {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  )
}

export default NewPurchase
