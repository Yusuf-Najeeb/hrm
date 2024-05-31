// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import TableHeader from 'src/views/apps/invoice/list/TableHeader'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Styled Components
import Button from '@mui/material/Button'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import CreateLeave from './CreateLeave'

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}))

// ** Vars
const invoiceStatusObj = {
  Sent: { color: 'secondary', icon: 'tabler:circle-check' },
  Paid: { color: 'success', icon: 'tabler:circle-half-2' },
  Draft: { color: 'primary', icon: 'tabler:device-floppy' },
  'Partial Payment': { color: 'warning', icon: 'tabler:chart-pie' },
  'Past Due': { color: 'error', icon: 'tabler:alert-circle' },
  Downloaded: { color: 'info', icon: 'tabler:arrow-down-circle' }
}

// ** renders client column
const renderClient = row => {
  if (row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(row.name || 'John Doe')}
      </CustomAvatar>
    )
  }
}

// const defaultColumns = [
//   {
//     flex: 0.1,
//     field: 'id',
//     minWidth: 100,
//     headerName: 'ID',
//     renderCell: ({ row }) => (
//       <Typography component={LinkStyled} href={`/apps/invoice/preview/${row.id}`}>{`#${row.id}`}</Typography>
//     )
//   },

//   // {
//   //   flex: 0.1,
//   //   minWidth: 80,
//   //   field: 'invoiceStatus',
//   //   renderHeader: () => <Icon icon='tabler:trending-up' />,
//   //   renderCell: ({ row }) => {
//   //     const { dueDate, balance, invoiceStatus } = row
//   //     const color = invoiceStatusObj[invoiceStatus] ? invoiceStatusObj[invoiceStatus].color : 'primary'

//   //     return (
//   //       <Tooltip
//   //         title={
//   //           <div>
//   //             <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
//   //               {invoiceStatus}
//   //             </Typography>
//   //             <br />
//   //             <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
//   //               Balance:
//   //             </Typography>{' '}
//   //             {balance}
//   //             <br />
//   //             <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
//   //               Due Date:
//   //             </Typography>{' '}
//   //             {dueDate}
//   //           </div>
//   //         }
//   //       >
//   //         <CustomAvatar skin='light' color={color} sx={{ width: '1.875rem', height: '1.875rem' }}>
//   //           <Icon icon={invoiceStatusObj[invoiceStatus].icon} />
//   //         </CustomAvatar>
//   //       </Tooltip>
//   //     )
//   //   }
//   // },
//   {
//     flex: 0.25,
//     field: 'name',
//     minWidth: 320,
//     headerName: 'full name',
//     renderCell: ({ row }) => {
//       const { name, companyEmail } = row

//       return (
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           {renderClient(row)}
//           <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//             <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
//               {name}
//             </Typography>
//             <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
//               {companyEmail}
//             </Typography>
//           </Box>
//         </Box>
//       )
//     }
//   },
//   {
//     flex: 0.1,
//     minWidth: 100,
//     field: 'total',
//     headerName: 'Total Leave',
//     renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{`$${row.total || 0}`}</Typography>
//   },
//   {
//     flex: 0.15,
//     minWidth: 140,
//     field: 'issuedDate',
//     headerName: 'Taken',
//     renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.issuedDate}</Typography>
//   },
//   {
//     flex: 0.1,
//     minWidth: 80,
//     field: 'invoiceStatus',
//     renderHeader: () => <Icon icon='tabler:trending-up' />,
//     renderCell: ({ row }) => {
//       const { dueDate, balance, invoiceStatus } = row
//       const color = invoiceStatusObj[invoiceStatus] ? invoiceStatusObj[invoiceStatus].color : 'primary'

//       return (
//         <Tooltip
//           title={
//             <div>
//               <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
//                 {invoiceStatus}
//               </Typography>
//               <br />
//               <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
//                 Balance:
//               </Typography>{' '}
//               {balance}
//               <br />
//               <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
//                 Due Date:
//               </Typography>{' '}
//               {dueDate}
//             </div>
//           }
//         >
//           <CustomAvatar skin='light' color={color} sx={{ width: '1.875rem', height: '1.875rem' }}>
//             <Icon icon={invoiceStatusObj[invoiceStatus].icon} />
//           </CustomAvatar>
//         </Tooltip>
//       )
//     }
//   },
//   {
//     flex: 0.1,
//     minWidth: 100,
//     field: 'balance',
//     headerName: 'Balance',
//     renderCell: ({ row }) => {
//       return row.balance !== 0 ? (
//         <Typography sx={{ color: 'text.secondary' }}>{row.balance}</Typography>
//       ) : (
//         <CustomChip rounded size='small' skin='light' color='success' label='Paid' />
//       )
//     }
//   }
// ]
/* eslint-disable */
// const CustomInput = forwardRef((props, ref) => {
//   const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
//   const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
//   const value = `${startDate}${endDate !== null ? endDate : ''}`
//   props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
//   const updatedProps = { ...props }
//   delete updatedProps.setDates
//   return <CustomTextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
// })

/* eslint-enable */
const LeaveManager = () => {
  // ** State
  const [value, setValue] = useState('')
  const [statusValue, setStatusValue] = useState('')
  const [leaveModal, setLeaveModal] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [dates, setDates] = useState([])

  // const [endDate, setEndDate] = useState(null)
  // const [startDate, setStartDate] = useState(null)
  const [selectedRows, setSelectedRows] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const dispatch = useDispatch()

  // const { RangePicker } = DatePicker

  const store = useSelector(state => state.invoice)

  const toggleModal = () => {
    setLeaveModal(!leaveModal)
  }

  const openLeaveModal = () => {
    setLeaveModal(true)
  }

  const handleFilter = val => {
    setValue(val)
    console.log(val)
  }

  const handleStatusValue = e => {
    setStatusValue(e.target.value)
  }

  const updateFetch = () => {
    setFetch(!refetch)
  }

  return (
    <Card
      sx={{
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
      }}
    >
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
        <Grid container>
          <Grid item xs={12} sm={6} spacing={4}>
            <CustomTextField
              fullWidth
              placeholder={'Leave status'}
              label={'Leave Status'}
              select
              SelectProps={{ value: statusValue, onChange: e => handleStatusValue(e) }}
            >
              <MenuItem value=''>All</MenuItem>
              <MenuItem value='Started'>Started</MenuItem>
              <MenuItem value='Ended'>Ended</MenuItem>
              <MenuItem value='Pending'>Pending</MenuItem>
              <MenuItem value='Approved'>Approved</MenuItem>
              <MenuItem value='Rejected'>Rejected</MenuItem>
              <MenuItem value='Cancelled'>Cancelled</MenuItem>
            </CustomTextField>
          </Grid>
        </Grid>
        <Box sx={{ minWidth: 350, display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
          <CustomTextField
            value={value}
            placeholder={'Search Staff'}
            onChange={e => handleFilter(e.target.value)}
            sx={{ mr: 4 }}
          />
          <Button
            sx={{ width: '40%', mb: 0, display: 'flex', alignItems: 'center', gap: 1 }}
            onClick={openLeaveModal}
            variant='contained'
          >
            Add New
            <Icon icon='mdi:plus' fontSize={20} />
          </Button>
        </Box>
      </CardContent>
      <CardContent sx={{ p: theme => theme.spacing(0) }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align={'left'}>Staff</TableCell>
                <TableCell align={'left'}>Department</TableCell>
                <TableCell align={'left'}>Role</TableCell>
                <TableCell align={'left'}>Starts</TableCell>
                <TableCell align={'left'}>Ends</TableCell>
                <TableCell align={'left'}>Status</TableCell>
                <TableCell align={'left'}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow></TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CreateLeave open={leaveModal} close={toggleModal} updateFetch={updateFetch} />
    </Card>

    // <DatePickerWrapper>
    //   <Grid container spacing={6}>
    //     <Grid item xs={12}>
    //       <Card>
    //         <CardHeader title='Filters' />
    //         <CardContent>
    //           <Grid container spacing={6}>
    //             <Grid item xs={12} sm={6}>
    //               <CustomTextField
    //                 select
    //                 fullWidth
    //                 label='Invoice Status'
    //                 SelectProps={{ value: statusValue, onChange: e => handleStatusValue(e) }}
    //               >
    //                 <MenuItem value=''>None</MenuItem>
    //                 <MenuItem value='downloaded'>Downloaded</MenuItem>
    //                 <MenuItem value='draft'>Draft</MenuItem>
    //                 <MenuItem value='paid'>Paid</MenuItem>
    //                 <MenuItem value='partial payment'>Partial Payment</MenuItem>
    //                 <MenuItem value='past due'>Past Due</MenuItem>
    //                 <MenuItem value='sent'>Sent</MenuItem>
    //               </CustomTextField>
    //             </Grid>
    //             <Grid item xs={12} sm={6}>
    //               <DatePicker
    //                 isClearable
    //                 selectsRange
    //                 monthsShown={2}
    //                 endDate={endDateRange}
    //                 selected={startDateRange}
    //                 startDate={startDateRange}
    //                 shouldCloseOnSelect={false}
    //                 id='date-range-picker-months'
    //                 onChange={handleOnChangeRange}
    //                 customInput={
    //                   <CustomInput
    //                     dates={dates}
    //                     setDates={setDates}
    //                     label='Invoice Date'
    //                     end={endDateRange}
    //                     start={startDateRange}
    //                   />
    //                 }
    //               />
    //             </Grid>
    //           </Grid>
    //         </CardContent>
    //       </Card>
    //     </Grid>
    //     <Grid item xs={12}>
    //       <Card>
    //         <TableHeader value={value} selectedRows={selectedRows} handleFilter={handleFilter} />
    //         <DataGrid
    //           autoHeight
    //           pagination
    //           rowHeight={62}
    //           rows={store.data}
    //           columns={columns}
    //           checkboxSelection
    //           disableRowSelectionOnClick
    //           pageSizeOptions={[10, 25, 50]}
    //           paginationModel={paginationModel}
    //           onPaginationModelChange={setPaginationModel}
    //           onRowSelectionModelChange={rows => setSelectedRows(rows)}
    //         />
    //       </Card>
    //     </Grid>
    //   </Grid>
    // </DatePickerWrapper>
  )
}

export default LeaveManager
