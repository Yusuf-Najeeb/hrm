import React, { useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import { useAppDispatch, useAppSelector } from '../../../hooks'
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import OptionsMenu from 'src/@core/components/option-menu'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { formatCurrency } from '../../../@core/utils/format'

const Cards = () => {
  // ** Hook
  const dispatch = useAppDispatch()

  return (
    <Grid container spacing={3} sx={{ display: { xs: 'none', lg: 'flex' } }}>
      <Grid item md={3}>
        <Card sx={{ px: 4, pb: 5, pt: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Typography>Target Achieved Last Month</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.3rem' } }}>{`${formatCurrency('0', true)}`}</Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'end' }}>
              {/* <Typography>0.00</Typography> */}
              <CustomAvatar
                skin='light'
                color={'success'}
                variant='rounded'
                sx={{ mt: 5, p: 1.5, width: 30, height: 30, borderRadius: 4, selfAlign: 'center' }}
              >
                <Icon fontSize='1.25rem' icon='tabler:chart-arcs' />
              </CustomAvatar>
            </Box>
          </Box>
        </Card>
      </Grid>

      <Grid item md={3}>
        <Card sx={{ px: 4, pb: 5, pt: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Typography>Target Achieved this month</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.3rem' } }}>{`${formatCurrency('0', true)}`}</Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'end' }}>
              {/* <Typography>0.00</Typography> */}
              <CustomAvatar
                skin='light'
                color={'success'}
                variant='rounded'
                sx={{ mt: 5, p: 1.5, width: 30, height: 30, borderRadius: 4, selfAlign: 'center' }}
              >
                <Icon fontSize='1.25rem' icon='tabler:chart-arcs' />
              </CustomAvatar>
            </Box>
          </Box>
        </Card>
      </Grid>

      <Grid item md={3}>
        <Card sx={{ px: 4, pb: 5, pt: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Typography>Target</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.3rem' } }}>{`${formatCurrency('0', true)}`}</Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'end' }}>
              {/* <Typography>0.00</Typography> */}
              <CustomAvatar
                skin='light'
                color={'success'}
                variant='rounded'
                sx={{ mt: 5, p: 1.5, width: 30, height: 30, borderRadius: 4, selfAlign: 'center' }}
              >
                <Icon fontSize='1.25rem' icon='tabler:chart-arcs' />
              </CustomAvatar>
            </Box>
          </Box>
        </Card>
      </Grid>

      <Grid item md={3}>
        <Card sx={{ px: 4, pb: 5, pt: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Typography>Commission Percent</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.3rem' } }}>{`${formatCurrency('0', true)}`}</Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'end' }}>
              {/* <Typography>0.00</Typography> */}
              <CustomAvatar
                skin='light'
                color={'success'}
                variant='rounded'
                sx={{ mt: 5, p: 1.5, width: 30, height: 30, borderRadius: 4, selfAlign: 'center' }}
              >
                <Icon fontSize='1.25rem' icon='tabler:chart-arcs' />
              </CustomAvatar>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Cards
