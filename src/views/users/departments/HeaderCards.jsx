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
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import OptionsMenu from 'src/@core/components/option-menu'
import CustomAvatar from 'src/@core/components/mui/avatar'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

import paper from 'src/@core/theme/overrides/paper'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import Paper from 'src/@core/theme/overrides/paper'

const series = [{ data: [37, 76, 65, 41, 99, 53, 70] }]

const data = [
  {
    progress: 64,
    stats: '$545.69',
    title: 'Earnings',
    avatarIcon: 'tabler:currency-dollar'
  },
  {
    progress: 59,
    title: 'Profit',
    stats: '$256.34',
    avatarColor: 'info',
    progressColor: 'info',
    avatarIcon: 'tabler:chart-pie-2'
  },
  {
    progress: 22,
    stats: '$74.19',
    title: 'Expense',
    avatarColor: 'error',
    progressColor: 'error',
    avatarIcon: 'tabler:brand-paypal'
  }
]

const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    paddingTop: '0 !important'
  }
}))

const DepartmentInfo = () => {
  // ** Hook
  const theme = useTheme()

  // const options = {
  //   chart: {
  //     parentHeightOffset: 0,
  //     toolbar: { show: false }
  //   },
  //   plotOptions: {
  //     bar: {
  //       borderRadius: 6,
  //       distributed: true,
  //       columnWidth: '42%',
  //       endingShape: 'rounded',
  //       startingShape: 'rounded'
  //     }
  //   },
  //   legend: { show: false },
  //   tooltip: { enabled: false },
  //   dataLabels: { enabled: false },
  //   colors: [
  //     hexToRGBA(theme.palette.primary.main, 0.16),
  //     hexToRGBA(theme.palette.primary.main, 0.16),
  //     hexToRGBA(theme.palette.primary.main, 0.16),
  //     hexToRGBA(theme.palette.primary.main, 0.16),
  //     hexToRGBA(theme.palette.primary.main, 1),
  //     hexToRGBA(theme.palette.primary.main, 0.16),
  //     hexToRGBA(theme.palette.primary.main, 0.16)
  //   ],
  //   states: {
  //     hover: {
  //       filter: { type: 'none' }
  //     },
  //     active: {
  //       filter: { type: 'none' }
  //     }
  //   },
  //   grid: {
  //     show: false,
  //     padding: {
  //       top: -28,
  //       left: -9,
  //       right: -10,
  //       bottom: -12
  //     }
  //   },
  //   xaxis: {
  //     axisTicks: { show: false },
  //     axisBorder: { show: false },
  //     categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  //     labels: {
  //       style: {
  //         colors: theme.palette.text.disabled,
  //         fontFamily: theme.typography.fontFamily,
  //         fontSize: theme.typography.body2.fontSize
  //       }
  //     }
  //   },
  //   yaxis: { show: false }
  // }

  return (
    <Grid container spacing={3} sx={{ display: { xs: 'none', lg: 'flex' } }}>
      <Grid item md={4}>
        <paper>
          <Card>
            <Box sx={{ display: 'flex', direction: 'row', alignItems: 'center' }}>
              <CardHeader sx={{ pb: 0 }} title='Departments' subheader='All Departments' />
              <CustomAvatar
                skin='light'
                variant='rounded'
                sx={{ mr: 2, mt: 5, width: 46, height: 46, selfAlign: 'center' }}
              >
                <Icon fontSize='2.125rem' icon='arcticons:emoji-department-store' />
              </CustomAvatar>
            </Box>
            {/* <Box sx={{ mb: 2.5 }}> */}
            <Typography variant='h6' sx={{ ml: 6, fontSize: '1.5rem', display: 'flex', justifyContent: 'start' }}>
              0
            </Typography>
            {/* </Box> */}
          </Card>
        </paper>
      </Grid>
      <Grid item md={4}>
        <paper>
          <Card>
            <Box sx={{ display: 'flex', direction: 'row', alignItems: 'center' }}>
              <CardHeader sx={{ pb: 0 }} title='Active' />
              <CustomAvatar
                skin='light'
                variant='rounded'
                sx={{ mr: 2, mt: 5, width: 46, height: 46, selfAlign: 'center' }}
              >
                <Icon fontSize='2.125rem' icon='codicon:vm-active' />
              </CustomAvatar>
            </Box>
            {/* <Box sx={{ mb: 2.5 }}> */}
            <Typography variant='h6' sx={{ ml: 6, fontSize: '1.5rem', display: 'flex', justifyContent: 'start' }}>
              0
            </Typography>
            {/* </Box> */}
          </Card>
        </paper>
      </Grid>
      <Grid item md={4}>
        <paper>
          <Card>
            <Box sx={{ display: 'flex', direction: 'row', alignItems: 'center' }}>
              <CardHeader sx={{ pb: 0 }} title='Inactive' />
              <CustomAvatar
                skin='light'
                variant='rounded'
                sx={{ mr: 2, mt: 5, width: 46, height: 46, selfAlign: 'center' }}
              >
                <Icon fontSize='2.125rem' icon='material-symbols-light:inactive-order' />
              </CustomAvatar>
            </Box>
            {/* <Box sx={{ mb: 2.5 }}> */}
            <Typography variant='h6' sx={{ ml: 6, fontSize: '1.5rem', display: 'flex', justifyContent: 'start' }}>
              0
            </Typography>
            {/* </Box> */}
          </Card>
        </paper>
      </Grid>
    </Grid>
  )
}

export default DepartmentInfo
