import React, { useState, useEffect } from 'react'

// * MUI Imports
import Drawer from '@mui/material/Drawer'
import { Typography, Box, Paper, IconButton, Grid, CircularProgress, Tooltip } from '@mui/material'
import Divider from '@mui/material/Divider'
import CustomAvatar from '../../../@core/components/mui/avatar'

// * Hooks and components
import { formatFirstLetter, formatCurrency } from '../../../@core/utils/format'
import { printPayslip } from '../../../store/apps/payslip/asyncthunk'
import { usePayrolls } from '../../../hooks/usePayroll'
import { useStaffs } from '../../../hooks/useStaffs'
import { styled, useTheme } from '@mui/material/styles'
import { getInitials } from 'src/@core/utils/get-initials'
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'

export const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const ViewPayroll = ({ openModal, closeModal, payrollId }) => {
  const [printingPayslipId, setPrintingPayslipId] = useState(null)
  const [isPrinting, setIsPrinting] = useState(false)
  const [deduction, setDeduction] = useState(0)
  const [allowance, setAllowance] = useState(0)

  // * Hooks
  const theme = useTheme()
  const [PayrollData] = usePayrolls()
  const [StaffsData] = useStaffs()

  const activePayroll = PayrollData?.find(payroll => payroll?.id === payrollId)
  const activeStaff = StaffsData?.find(staff => staff?.id === activePayroll?.user?.id)

  // console.log(activePayroll, 'active payroll')
  // console.log(activeStaff)

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

  const printPayslipItem = (selectedId, period) => {
    setIsPrinting(true)
    setPrintingPayslipId(selectedId)
    printPayslip(selectedId, period)
      .then(res => {
        setIsPayslipAvailable(true)
        setPayslipDownloadLink(res.data.url)
        setIsPrinting(false)
      })
      .catch(() => {
        setIsPrinting(false)
      })
  }
  useEffect(() => {
    setDeduction(activePayroll?.totalDeduction)
    setAllowance(activePayroll?.totalAllowance)

    //eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Header>
          <Typography variant='h5'>
            Viewing {`${formatFirstLetter(activeStaff?.firstname)} ${formatFirstLetter(activeStaff?.lastname)}` || '--'}
            's Profile
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
            <Icon icon='tabler:x' fontSize='1.5rem' />
          </IconButton>
        </Header>

        <Box sx={{ py: theme.spacing(6), px: theme.spacing(6) }}>
          <Box sx={{ minWidth: 120, minHeight: 120, mb: 2 }}>{renderClient(activeStaff)}</Box>
          <Grid container spacing={0}>
            <Grid item xs={1}>
              <Typography sx={{ py: theme.spacing(2) }}>Name:</Typography>
              <Typography sx={{ py: theme.spacing(2) }}>Role:</Typography>
              <Typography sx={{ py: theme.spacing(2) }}>Phone:</Typography>
              <Typography sx={{ py: theme.spacing(2) }}>Email:</Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography sx={{ fontWeight: 300, py: theme.spacing(2) }}>
                {`${formatFirstLetter(activeStaff?.firstname)} ${formatFirstLetter(activeStaff?.lastname)}`}
              </Typography>
              <Typography sx={{ py: theme.spacing(2) }}>{formatFirstLetter(activeStaff?.role?.name)}</Typography>
              <Typography sx={{ py: theme.spacing(2) }}>{activeStaff?.phone || 'N/A'}</Typography>
              <Typography sx={{ py: theme.spacing(2) }}>{activeStaff?.email || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Typography
          variant='h5'
          sx={{ py: theme.spacing(3), textAlign: 'center', backgroundColor: 'primary.main', color: 'white' }}
        >
          Payroll Information
        </Typography>
        <Box sx={{ py: theme.spacing(6), px: theme.spacing(6), fontSize: '1rem' }}>
          <Grid container>
            <Grid item xs={6}>
              <Typography sx={{ py: theme.spacing(2) }}>Department:</Typography>
              <Typography sx={{ py: theme.spacing(2) }}>Staff ID:</Typography>
              <Typography sx={{ py: theme.spacing(2) }}>Gross Salary:</Typography>
              <Typography sx={{ py: theme.spacing(2) }}>Net Salary</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ py: theme.spacing(2) }}>{activeStaff?.department?.name}</Typography>
              <Typography sx={{ py: theme.spacing(2) }}>{`#${activeStaff?.id}`}</Typography>
              <Typography sx={{ py: theme.spacing(2) }}>{formatCurrency(activeStaff?.grossSalary, true)}</Typography>
              <Typography sx={{ py: theme.spacing(2) }}>{`${formatCurrency(
                activeStaff?.grossSalary + allowance - deduction,
                true
              )}`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ py: theme.spacing(2) }}>Period:</Typography>
              <Typography sx={{ py: theme.spacing(2) }}>Account Name</Typography>
              <Typography sx={{ py: theme.spacing(2) }}>Account Number</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ py: theme.spacing(2) }}>{activePayroll?.period || '--'}</Typography>
              <Typography sx={{ py: theme.spacing(2) }}>{activeStaff?.bankName || 'N/A'}</Typography>
              <Typography sx={{ py: theme.spacing(2) }}>{activeStaff?.accountNumber || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Typography
          variant='h5'
          sx={{ py: theme.spacing(3), textAlign: 'center', backgroundColor: 'primary.main', color: 'white' }}
        >
          Benefits and Deductions
        </Typography>
        <Grid
          container
          sx={{
            py: theme.spacing(6),
            px: theme.spacing(6),
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'space-between',
            gap: { sm: 8, md: 12 }
          }}
        >
          <Grid item xs={5}>
            {activePayroll?.allowances?.length < 1 && (
              <Typography sx={{ textAlign: 'center' }}>No Allowance Found!</Typography>
            )}

            {activePayroll?.allowances?.map(item => {
              return (
                <Box
                  key={item?.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography sx={{ my: 4 }}>{formatFirstLetter(item?.description)}</Typography>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label={formatCurrency(item?.amount, true)}
                    color={'success'}
                  />
                </Box>
              )
            })}
            <Divider />
            <Box
              sx={{
                display: 'flex',
                alignItem: 'center',
                justifyContent: 'space-between',
                my: 4,
                fontSize: '1.4rem'
              }}
            >
              <Typography>Total Allowance</Typography>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={formatCurrency(activePayroll?.totalAllowance, true)}
                color={'success'}
              />
            </Box>
          </Grid>

          <Grid item xs={5}>
            {activePayroll?.deductions?.length < 1 && (
              <Typography sx={{ textAlign: 'center' }}>No Deduction Found!</Typography>
            )}
            {activePayroll?.deductions.map(item => {
              return (
                <Box
                  key={item?.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'

                    // gap: { sm: 16, md: 20 }
                  }}
                >
                  <Typography sx={{ my: 4 }}>{formatFirstLetter(item?.description)}</Typography>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label={formatCurrency(item?.amount, true)}
                    color={'error'}
                  />
                </Box>
              )
            })}
            <Divider />
            <Box
              sx={{
                display: 'flex',
                alignItem: 'center',
                justifyContent: 'space-between',
                my: 4,
                fontSize: '1.4rem'
              }}
            >
              <Typography>Total Deductions</Typography>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={formatCurrency(activePayroll?.totalDeduction, true)}
                color={'error'}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Print Payroll */}
        <Box sx={{ display: 'flex', justifyContent: 'end', p: theme.spacing(6) }}>
          {printingPayslipId === activeStaff?.id && isPrinting ? (
            <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} />
          ) : (
            <Tooltip title='Print Payslip' placement='top'>
              <IconButton
                size='small'
                onClick={() => printPayslipItem(activeStaff?.id, activePayroll?.period)}
                sx={{
                  borderRadius: 1,
                  color: 'text.primary',
                  backgroundColor: 'action.selected',
                  '&:hover': {
                    backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
                  }
                }}
              >
                <Icon icon='material-symbols:print-outline' fontSize='1.5rem' />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Drawer>
    </main>
  )
}

export default ViewPayroll
