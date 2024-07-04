import React from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Stack from '@mui/material/Stack'

const DailyAttendance = () => {
  return (
    <Stack direction={'row'} sx={{ my: 8 }}>
      {/* <CardHeader title="Today's Check-In" /> */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: '1rem', my: 2 }}>Check-In Activity</Typography>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Staff</TableCell>
                  <TableCell>Time-In</TableCell>
                  <TableCell>Time-Out</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography sx={{ textAlign: 'center' }}>No Data</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: '1rem', my: 2 }}>Departments</Typography>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Department</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography sx={{ textAlign: 'center' }}>No Data</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default DailyAttendance
