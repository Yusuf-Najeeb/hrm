import { Button, CircularProgress, Dialog, DialogActions, DialogContent, Grid } from '@mui/material'
import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SalaryItemSchema } from 'src/@core/FormSchema'
import { Controller, useForm } from 'react-hook-form'

import CustomTextField from 'src/@core/components/mui/text-field'
import axios from 'axios'
import { useAppDispatch } from '../../../hooks'
import { fetchDeductionCategory } from '../../../store/apps/deductionCatergory/asyncthunk'

// const CustomInput = forwardRef(({ ...props }, ref) => {
//     return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
//   })

const defaultValues = {
  name: '',
  percentage: Number('')
}

const CreateDeductionCategory = ({ openDialog, closeDialog, refetchDeductionCategory }) => {

  const dispatch = useAppDispatch()

  const {
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(SalaryItemSchema)
  })

  const createDeductionCategory = async values => {
    try {
      const createUrl = `/deductions/category`

      const resp = await axios.post(
        createUrl,
        { ...values },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      if (resp.data.success) {
        closeDialog()
        reset()
        refetchDeductionCategory()
        dispatch(fetchDeductionCategory())
      }
    } catch (error) {}
  }

  return (
    <Dialog open={openDialog} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 450 } }}>
      <form onSubmit={handleSubmit(createDeductionCategory)}>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    label=' Deduction Category Name'
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.name)}
                    {...(errors.name && { helperText: 'Deduction Category is requried' })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name='percentage'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    type='text'
                    label='Percentage'
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.percentage)}
                    {...(errors.percentage && { helperText: errors.percentage.message })}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button type='submit' variant='contained' sx={{ mr: 2 }}>
            {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Submit'}
          </Button>
          <Button type='button' variant='tonal' color='secondary' onClick={closeDialog}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CreateDeductionCategory
