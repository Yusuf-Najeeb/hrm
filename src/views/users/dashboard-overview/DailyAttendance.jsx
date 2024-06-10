import React from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'

const DailyAttendance = () => {
  return (
    <Box sx={{ my: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: '1.2rem', my: 2 }}>Today's Attendance</Typography>
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
          <Typography sx={{ fontSize: '1.2rem', my: 2 }}>Active Departments</Typography>
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
    </Box>
  )
}

export default DailyAttendance
