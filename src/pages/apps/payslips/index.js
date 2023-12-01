import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { colorsProgress } from 'src/configs/colorConfigs'

const PayslipSet = [
  {
    id: 1,
    label: 'Food',
    value: 20
  },
  {
    id: 2,
    label: 'Transport',
    value: 50
  },
  {
    id: 3,
    label: 'Water',
    value: 78
  }
]

const BorderLinearProgress = styled(LinearProgress)(({ theme, bgc }) => {
  return {
    padding: 4,
    height: 16,
    borderRadius: 5,

    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: `${bgc}`
    }
  }
})

const PayslipsSettings = () => {
  return (
    <div>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h5' color='textSecondary'>
          Payslips Settings
        </Typography>

        <Button variant='contained' startIcon={<Icon icon='tabler:square-rounded-plus' />}>
          Create
        </Button>
      </Stack>
      <KeenSliderWrapper sx={{ mx: 8, my: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={6}>
            <Card>
              <CardContent>
                {PayslipSet.map((item, index) => (
                  <Box key={item.id} display='flex' flexDirection='column' sx={{ mb: 4 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 2
                      }}
                    >
                      <Typography variant='body2' color='textSecondary'>
                        {item.label}
                      </Typography>
                      <Typography variant='body2' color='textSecondary'>{`${item.value}%`}</Typography>
                    </Box>
                    <Box width='100%' mr={1}>
                      <BorderLinearProgress variant='determinate' value={item.value} bgc={`${colorsProgress[index]}`} />
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Card>
              <CardContent>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align='left'>Name</TableCell>
                      <TableCell align='center'>%</TableCell>
                      <TableCell align='right'>actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {PayslipSet.map(item => (
                      <TableRow key={item.id} hover>
                        <TableCell>{item.label}</TableCell>
                        <TableCell align='center'>{`${item.value}%`}</TableCell>
                        <TableCell align='right'>
                          <IconButton size='small'>
                            <Icon icon='tabler:edit' />
                          </IconButton>
                          <IconButton size='small'>
                            <Icon icon='tabler:trash' />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </div>
  )
}

export default PayslipsSettings
