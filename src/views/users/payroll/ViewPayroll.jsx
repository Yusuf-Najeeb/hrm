import React, { useState, useEffect } from 'react'

// * MUI Imports
import Drawer from '@mui/material/Drawer'
import { Typography, Box, IconButton, Stack, Grid } from '@mui/material'
import CustomAvatar from '../../../@core/components/mui/avatar'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

// * Hooks and components
import { formatFirstLetter, formatCurrency } from '../../../@core/utils/format'
import { fetchStaffs } from '../../../store/apps/staffs'
import { useStaffs } from '../../../hooks/useStaffs'
import { styled, useTheme } from '@mui/material/styles'
import { getInitials } from 'src/@core/utils/get-initials'
import Icon from 'src/@core/components/icon'

export const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const ViewPayroll = ({ openModal, closeModal, staffInfo }) => {
  const theme = useTheme()
  const [StaffsData] = useStaffs()
  const [staffs, setStaffs] = useState([])
  const activeStaff = StaffsData?.find(staff => staff?.id === staffInfo)
  console.log(activeStaff)

  const renderClient = row => {
    const initials = `${formatFirstLetter(row?.firstname)} ${formatFirstLetter(row?.lastname)}`
    if (row?.image?.length) {
      return (
        <CustomAvatar
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${row?.image}`}
          sx={{ mr: 2.5, minWidth: 120, minHeight: 120 }}
        />
      )
    } else {
      return (
        <CustomAvatar
          skin='light'
          color={row?.id % 2 === 0 ? 'primary' : 'secondary'}
          sx={{
            mr: 2.5,
            minWidth: 120,
            minHeight: 120,
            fontWeight: 500,
            fontSize: theme => theme.typography.body1.fontSize
          }}
        >
          {getInitials(initials || 'John Doe')}
        </CustomAvatar>
      )
    }
  }
  useEffect(() => {
    setStaffs(StaffsData)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      <Drawer
        open={openModal}
        anchor='right'
        size='md'
        variant='temporary'
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '90%', sm: '60%' } } }}
      >
        <Box sx={{ py: theme.spacing(6), px: theme.spacing(6) }}>
          <Header>
            <Typography variant='h5'>
              Viewing{' '}
              {`${formatFirstLetter(activeStaff?.firstname)} ${formatFirstLetter(activeStaff?.lastname)}` || '--'}'s
              Profile
            </Typography>
            <IconButton
              size='small'
              onClick={closeModal}
              sx={{
                borderRadius: 1,
                color: 'text.primary',
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
                }
              }}
            >
              <Icon icon='tabler:x' fontSize='1.7rem' />
            </IconButton>
          </Header>

          <Stack>
            <Box sx={{ minWidth: 120, minHeight: 120, mb: 2 }}>{renderClient(activeStaff)}</Box>
            <Typography sx={{ fontSize: '1.2rem', fontWeight: 300 }}>
              Name: {`${formatFirstLetter(activeStaff?.firstname)} ${formatFirstLetter(activeStaff?.lastname)}`}
            </Typography>
            <Typography>Role: {formatFirstLetter(activeStaff?.role?.name)}</Typography>
            <Typography>Phone: {activeStaff?.phone || 'N/A'}</Typography>
            <Typography>Email: {activeStaff?.email || 'N/A'}</Typography>
          </Stack>
        </Box>
        <Box sx={{ py: theme.spacing(6), px: theme.spacing(6) }}>
          <Typography
            variant='h5'
            sx={{ py: theme.spacing(3), textAlign: 'center', backgroundColor: 'primary.main', color: 'white' }}
          >
            Payroll Information
          </Typography>
          <Box>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>Department:</Typography>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>Staff ID:</Typography>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>Gross Salary:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>
                  {activeStaff?.department?.name}
                </Typography>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>{`#${activeStaff?.id}`}</Typography>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>
                  {formatCurrency(activeStaff?.grossSalary, true)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>Period:</Typography>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>Account Name</Typography>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>Account Number</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>{activeStaff?.period || '--'}</Typography>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>
                  {activeStaff?.bankName || 'N/A'}
                </Typography>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>
                  {activeStaff?.accountNumber || 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography
              variant='h5'
              sx={{ py: theme.spacing(3), textAlign: 'center', backgroundColor: 'primary.main', color: 'white' }}
            >
              Benefits and Deductions
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>Department:</Typography>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>Staff ID:</Typography>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>Gross Salary:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>
                  {activeStaff?.department?.name}
                </Typography>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>{`#${activeStaff?.id}`}</Typography>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>
                  {formatCurrency(activeStaff?.grossSalary, true)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>Period:</Typography>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>Account Name</Typography>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>Account Number</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>{activeStaff?.period || '--'}</Typography>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>
                  {activeStaff?.bankName || 'N/A'}
                </Typography>
                <Typography sx={{ fontSize: '1.2rem', py: theme.spacing(2) }}>
                  {activeStaff?.accountNumber || 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Drawer>
    </main>
  )
}

export default ViewPayroll
