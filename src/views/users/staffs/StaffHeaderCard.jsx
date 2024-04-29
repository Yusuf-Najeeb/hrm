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
import { fetchStaffs } from '../../../store/apps/staffs/asyncthunk'
import { useStaffs } from '../../../hooks/useStaffs'
import { useDepartments } from '../../../hooks/useDepartments'
import paper from 'src/@core/theme/overrides/paper'

const DepartmentInfo = ({ departments, active, inActive }) => {
  // ** Hook
  const dispatch = useAppDispatch()
  const theme = useTheme()

  // const [DepartmentsData, loadingDepartments, paging, aggregations] = useDepartments()
  const [StaffsData, paging, loading, aggregations] = useStaffs()

  useEffect(() => {
    dispatch(fetchStaffs({ page: 1, limit: 10 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid container spacing={3} sx={{ display: { xs: 'none', lg: 'flex' }, mb: 5 }}>
      <Grid item md={3}>
        <Card sx={{ px: 3, pb: 5, pt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '1rem' }}>All Staff</Typography>

            <CustomAvatar
              color={'info'}
              skin='light'
              variant='rounded'
              sx={{ mr: 2, mt: 5, p: 1.5, width: 40, height: 40, borderRadius: 4, selfAlign: 'end' }}
            >
              <Icon fontSize='2.125rem' icon='mdi:user-group-outline' />
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
            <Typography sx={{ fontSize: '1rem' }}>Active Staff</Typography>
            <CustomAvatar
              color={'success'}
              skin='light'
              variant='rounded'
              sx={{ mt: 5, p: 1.5, width: 40, height: 40, borderRadius: 4, selfAlign: 'center' }}
            >
              <Icon fontSize='2.125rem' icon='mdi:user-badge-outline' />
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
            {aggregations?.total_active || 0}
          </Typography>
        </Card>
      </Grid>

      <Grid item md={3}>
        <Card sx={{ px: 3, pb: 5, pt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '1rem' }}>Inactive Staff</Typography>
            <CustomAvatar
              color={'error'}
              skin='light'
              variant='rounded'
              sx={{ mr: 2, mt: 5, p: 1.5, width: 40, height: 40, selfAlign: 'center', borderRadius: 4 }}
            >
              <Icon fontSize='2.125rem' icon='mdi:user-badge-alert-outline' />
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
            {aggregations?.total_inactive || 0}
          </Typography>
        </Card>
      </Grid>

      <Grid item md={3}>
        <Card sx={{ px: 3, pb: 5, pt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '1rem' }}>All Departments</Typography>

            <CustomAvatar
              color={'warning'}
              skin='light'
              variant='rounded'
              sx={{ mr: 2, mt: 5, p: 1.5, width: 40, height: 40, borderRadius: 4, selfAlign: 'center' }}
            >
              <Icon fontSize='2.125rem' icon='arcticons:emoji-department-store' />
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
            {aggregations?.total_departments || 0}
          </Typography>
        </Card>
      </Grid>
    </Grid>
  )
}

export default DepartmentInfo
