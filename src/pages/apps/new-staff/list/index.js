
import StepperLinearAndValidation from '../../../../../src/views/forms/form-wizard/StepperLinearWithValidation'
import Grid from '@mui/material/Grid'
import CreateStaff from '../../../../views/users/staffs/CreateStaff'


const InvoiceList = () => {
  return (
    <Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <CreateStaff />
      </Grid>
    </Grid>
  )
}

export default InvoiceList
