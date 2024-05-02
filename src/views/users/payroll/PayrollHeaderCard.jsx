import React, { useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'
import LinearProgress from '@mui/material/LinearProgress'

// ** Custom Components Imports
import { useAppDispatch, useAppSelector } from '../../../hooks'
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import OptionsMenu from 'src/@core/components/option-menu'
import CustomAvatar from 'src/@core/components/mui/avatar'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

import { fetchPayroll } from '../../../store/apps/payroll/asyncthunk'
import { usePayrolls } from '../../../hooks/usePayroll'

import paper from 'src/@core/theme/overrides/paper'

const PayrollInfo = () => {
  // ** Hook
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const [PayrollData, paging, loading, aggregations] = usePayrolls()

  useEffect(() => {
    dispatch(fetchPayroll({ year: 2024, departmentId: 1, userId: 1 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid container spacing={3} sx={{ display: { xs: 'none', lg: 'flex' }, mb: 5 }}>
      <Grid item md={3}>
        <Card sx={{ px: 3, pb: 5, pt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '1rem' }}>Total</Typography>

            <CustomAvatar
              color={'info'}
              skin='light'
              variant='rounded'
              sx={{ mr: 2, mt: 5, p: 1.7, width: 40, height: 40, borderRadius: 4, selfAlign: 'end' }}
            >
              <Icon fontSize='2.125rem' icon='uiw:pay' />
            </CustomAvatar>
          </Box>
          <Typography
            variant='h6'
            sx={{
              fontSize: '1.3rem',
              display: 'flex',
              mt: -4
            }}
          >
            {aggregations?.total || 0}
          </Typography>
        </Card>
      </Grid>

      <Grid item md={3}>
        <Card sx={{ px: 3, pb: 5, pt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '1rem' }}>Paid</Typography>
            <CustomAvatar
              color={'success'}
              skin='light'
              variant='rounded'
              sx={{ mt: 5, p: 1.5, width: 40, height: 40, borderRadius: 4, selfAlign: 'center' }}
            >
              <Icon fontSize='2.125rem' icon='healthicons:money-bag' />
            </CustomAvatar>
          </Box>
          <Typography
            variant='h6'
            sx={{
              fontSize: '1.3rem',
              display: 'flex',
              mt: -4
            }}
          >
            {aggregations?.paid || 0}
          </Typography>
        </Card>
      </Grid>

      <Grid item md={3}>
        <Card sx={{ px: 3, pb: 5, pt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '1rem' }}>Pending</Typography>
            <CustomAvatar
              color={'error'}
              skin='light'
              variant='rounded'
              sx={{ mr: 2, mt: 5, p: 1.5, width: 40, height: 40, selfAlign: 'center', borderRadius: 4 }}
            >
              <Icon fontSize='2.125rem' icon='mdi:account-pending-outline' />
            </CustomAvatar>
          </Box>
          <Typography
            variant='h6'
            sx={{
              fontSize: '1.3rem',
              display: 'flex',
              mt: -4
            }}
          >
            {aggregations?.pending || 0}
          </Typography>
        </Card>
      </Grid>

      <Grid item md={3}>
        <Card sx={{ px: 3, pb: 5, pt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '1rem' }}>Periods</Typography>

            <CustomAvatar
              color={'warning'}
              skin='light'
              variant='rounded'
              sx={{ mr: 2, mt: 5, p: 1.5, width: 40, height: 40, borderRadius: 4, selfAlign: 'center' }}
            >
              <Icon fontSize='2.125rem' icon='fluent-mdl2:calendar-year' />
            </CustomAvatar>
          </Box>
          <Typography
            variant='h6'
            sx={{
              fontSize: '1.3rem',
              display: 'flex',
              mt: -4
            }}
          >
            {aggregations?.totalPeriod || 0}
          </Typography>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PayrollInfo
