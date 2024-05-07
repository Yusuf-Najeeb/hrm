import React, { useState } from 'react'
import { Typography, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import PayrollHeader from './PayrollHeaderCard'
import CreateConfig from './CreateConfig'

const Config = () => {
  const [open, setOpen] = useState(true)

  const close = () => setOpen(!open)

  return (
    <main>
      <PayrollHeader />
      <Grid container spacing={2} sx={{ mt: 6 }}>
        <Grid item sm={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Add Salary Item</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <CreateConfig />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>

        <Grid item sm={9}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell align='left' sx={{ maxWidth: 100 }}>
                ADD SALARY ITEM
              </TableCell> */}
                  <TableCell>NAME</TableCell>
                  <TableCell>PERCENTAGE</TableCell>
                  <TableCell>MODIFIED BY</TableCell>
                  <TableCell>MODIFIED ON</TableCell>
                  <TableCell>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </main>
  )
}

export default Config
