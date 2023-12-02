// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports

import StaffViewLeft from './StaffViewLeft'

import StaffViewRight from './StaffRightView'

const StaffViewPage = ({ tab, invoiceData }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <StaffViewLeft />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <StaffViewRight tab={tab} invoiceData={invoiceData} />
      </Grid>
    </Grid>
  )
}

export default StaffViewPage
