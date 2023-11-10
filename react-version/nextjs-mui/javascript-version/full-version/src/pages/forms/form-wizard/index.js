// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import StepperCustomVertical from 'src/views/apps/user/list/form-wizard/StepperCustomVertical'
import StepperCustomHorizontal from 'src/views/apps/user/list/form-wizard/StepperCustomHorizontal'
import StepperAlternativeLabel from 'src/views/apps/user/list/form-wizard/StepperAlternativeLabel'
import StepperVerticalWithNumbers from 'src/views/apps/user/list/form-wizard/StepperVerticalWithNumbers'
import StepperLinearWithValidation from 'src/views/apps/user/list/form-wizard/StepperLinearWithValidation'
import StepperVerticalWithoutNumbers from 'src/views/apps/user/list/form-wizard/StepperVerticalWithoutNumbers'

const FormWizard = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h6'>Linear Stepper with Validation</Typography>
      </Grid>
      <Grid item xs={12}>
        <StepperLinearWithValidation />
      </Grid>
      <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
        <Typography variant='h6'>Alternative Label</Typography>
      </Grid>
      <Grid item xs={12}>
        <StepperAlternativeLabel />
      </Grid>
      <Grid item xs={12}>
        <StepperVerticalWithNumbers />
      </Grid>
      <Grid item xs={12}>
        <StepperVerticalWithoutNumbers />
      </Grid>
      <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
        <Typography variant='h6'>Custom Horizontal Stepper</Typography>
      </Grid>
      <Grid item xs={12}>
        <StepperCustomHorizontal />
      </Grid>
      <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
        <Typography variant='h6'>Custom Vertical Stepper</Typography>
      </Grid>
      <Grid item xs={12}>
        <StepperCustomVertical />
      </Grid>
    </Grid>
  )
}

export default FormWizard
