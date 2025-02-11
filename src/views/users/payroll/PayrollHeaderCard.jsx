import React, { useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import { useAppDispatch, useAppSelector } from '../../../hooks'
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { fetchPayroll } from '../../../store/apps/payroll/asyncthunk'
import { usePayrolls } from '../../../hooks/usePayroll'

const PayrollInfo = () => {
  // ** Hook
  const dispatch = useAppDispatch()

  // const theme = useTheme()
  const [PayrollData, paging, loading, aggregations] = usePayrolls()

  useEffect(() => {
    dispatch(fetchPayroll({ year: 2024, departmentId: 1, userId: 1 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid container spacing={3} sx={{ display: { xs: 'none', lg: 'flex' }, mb: 5 }}>
      <Grid item md={3}>
        <Card sx={{ px: 5, pb: 5, pt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '1rem' }}>Total</Typography>
            <CustomAvatar
              color={'info'}
              skin='light'
              variant='rounded'
              sx={{ mr: 2, mt: 5, p: 1.7, width: 43, height: 43, borderRadius: 4, selfAlign: 'end' }}
            >
              <Icon fontSize='1.5rem' icon='uiw:pay' />
            </CustomAvatar>
          </Box>
          <Typography
            variant='h6'
            sx={{
              fontSize: '1.3rem',
              display: 'flex',
              mt: -4,
              ml: 1
            }}
          >
            {aggregations?.total || 0}
          </Typography>
        </Card>
      </Grid>

      <Grid item md={3}>
        <Card sx={{ px: 5, pb: 5, pt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '1rem' }}>Paid</Typography>
            <CustomAvatar
              color={'success'}
              skin='light'
              variant='rounded'
              sx={{ mt: 5, p: 1.5, width: 43, height: 43, borderRadius: 4, selfAlign: 'center' }}
            >
              <Icon fontSize='2rem' icon='healthicons:money-bag' />
            </CustomAvatar>
          </Box>
          <Typography
            variant='h6'
            sx={{
              fontSize: '1.3rem',
              display: 'flex',
              mt: -4,
              ml: 1
            }}
          >
            {aggregations?.paid || 0}
          </Typography>
        </Card>
      </Grid>

      <Grid item md={3}>
        <Card sx={{ px: 5, pb: 5, pt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '1rem' }}>Pending</Typography>
            <CustomAvatar
              color={'error'}
              skin='light'
              variant='rounded'
              sx={{ mr: 2, mt: 5, p: 1.5, width: 43, height: 43, selfAlign: 'center', borderRadius: 4 }}
            >
              <Icon fontSize='1.8rem' icon='mdi:account-pending-outline' />
            </CustomAvatar>
          </Box>
          <Typography
            variant='h6'
            sx={{
              fontSize: '1.3rem',
              display: 'flex',
              mt: -4,
              ml: 1
            }}
          >
            {aggregations?.pending || 0}
          </Typography>
        </Card>
      </Grid>

      <Grid item md={3}>
        <Card sx={{ px: 5, pb: 5, pt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '1rem' }}>Periods</Typography>

            <CustomAvatar
              color={'warning'}
              skin='light'
              variant='rounded'
              sx={{ mr: 2, mt: 5, p: 1.5, width: 43, height: 43, borderRadius: 4, selfAlign: 'center' }}
            >
              <Icon fontSize='1.5rem' icon='fluent-mdl2:calendar-year' />
            </CustomAvatar>
          </Box>
          <Typography
            variant='h6'
            sx={{
              fontSize: '1.3rem',
              display: 'flex',
              mt: -4,
              ml: 1
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
