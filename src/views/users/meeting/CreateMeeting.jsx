//** React Imports
import React, { Fragment } from 'react'

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
import { Alert } from '@mui/material'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const defaultValues = {
  title: '',
  date: '',
  issuerName: '',
  recipient: '',
  body: ''
}

const NewMeeting = ({ open, closeCanvas }) => {
  const [StaffsData] = useStaffs()
  const theme = useTheme()

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

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 800, sm: 800 } } }}
    >
      <Header>
        <Typography variant='h3'>Schedule Meeting</Typography>
        <IconButton
          size='small'
          onClick={closeCanvas}
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
            {/* <Typography sx={{ textAlign: 'left', fontSize: '1.25rem', my: 4 }}>Retirement</Typography> */}

            <Grid container spacing={8}>
              <Grid item xs={12} sm={12}>
                <Controller
                  name='title'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Title'
                      placeholder='Meeting Title'
                      onChange={onChange}
                      error={Boolean(errors?.title)}
                      aria-describedby='stepper-linear-account-userId'
                      {...(errors?.title && { helperText: errors?.title.message })}
                    />
                  )}
                />
              </Grid>

              <Grid container spacing={5} sx={{ ml: theme => theme.spacing(3), my: theme => theme.spacing(3) }}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='start'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        selected={value}
                        dateFormat='Pp'
                        popperPlacement='bottom-end'
                        showTimeSelect
                        onChange={e => {
                          onChange(e)
                        }}
                        placeholderText='MM-DD-YYYY 00:00'
                        customInput={
                          <CustomInput
                            value={value}
                            onChange={onChange}
                            autoComplete='off'
                            label='Start Date/Time'
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
                    name='end'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        selected={value}
                        dateFormat='Pp'
                        popperPlacement='bottom-end'
                        showTimeSelect
                        onChange={e => {
                          onChange(e)
                        }}
                        placeholderText='MM-DD-YYYY 00:00'
                        customInput={
                          <CustomInput
                            value={value}
                            onChange={onChange}
                            autoComplete='off'
                            label='Ends Date/Time'
                            error={Boolean(errors?.date)}
                            {...(errors?.date && { helperText: errors?.date.message })}
                          />
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={5} sx={{ ml: theme => theme.spacing(3), my: theme => theme.spacing(3) }}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='issuerName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        label='Issuer Name'
                        placeholder='John Doe'
                        onChange={onChange}
                        error={Boolean(errors?.issuerName)}
                        aria-describedby='stepper-linear-account-userId'
                        {...(errors?.issuerName && { helperText: errors?.issuerName.message })}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='venue'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        label='Venue'
                        placeholder='Virtual/In-Person'
                        onChange={onChange}
                        error={Boolean(errors?.recipient)}
                        aria-describedby='stepper-linear-account-userId'
                        {...(errors?.recipient && { helperText: errors?.recipient.message })}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='meeting_link'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Meeting Link'
                      placeholder='pim-zfbq-ptk'
                      onChange={onChange}
                      error={Boolean(errors?.recipient)}
                      aria-describedby='stepper-linear-account-userId'
                      {...(errors?.recipient && { helperText: errors?.recipient.message })}
                    />
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
                      rows={8}
                      label='Description'
                      onChange={onChange}
                      placeholder='Meeting Description'
                      error={Boolean(errors.body)}
                      {...(errors.body && { helperText: errors.body.message })}
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
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
              mt: theme => [`${theme.spacing(4)} !important`]
            }}
          >
            <Button type='button' variant='tonal' color='secondary' onClick={closeCanvas}>
              Cancel
            </Button>
            <Button type='submit' variant='contained' sx={{ mr: 2 }}>
              {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Save'}
            </Button>
          </DialogActions>
        </form>
      </Box>
    </Drawer>
  )
}

export default NewMeeting
