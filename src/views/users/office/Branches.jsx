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
import Button from '@mui/material/Button'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
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
import { CustomInput } from '../duty-roster/UploadRosterDialog'

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

const Branches = () => {
  // ** State
  const [value, setValue] = useState('')
  const [paymentType, setPaymentType] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [statusValue, setStatusValue] = useState('')
  const [modal, setModal] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [dates, setDates] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const dispatch = useDispatch()

  const store = useSelector(state => state.invoice)

  const toggleModal = () => {
    setModal(!modal)
  }

  const openModal = () => {
    setModal(true)
  }

  const handleFilter = val => {
    setValue(val)
  }

  const handlePayment = e => {
    setPaymentType(e.target.value)
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
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} spacing={4}>
            <CustomTextField
              fullWidth
              value={value}
              placeholder={'Search Branch'}
              onChange={e => handleFilter(e.target.value)}
              sx={{ mr: 4 }}
            />
          </Grid>
        </Grid>
        <Box sx={{ minWidth: 350, display: 'flex', justifyContent: 'end', alignItems: 'center', gap: 4 }}>
          <Button onClick={openModal} variant='contained'>
            New Branch
            <Icon icon='mdi:plus' fontSize={20} />
          </Button>
        </Box>
      </CardContent>
      <CardContent sx={{ p: theme => theme.spacing(0) }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align={'left'}>Branch Name</TableCell>
                <TableCell align={'left'}>Manager</TableCell>
                <TableCell align={'left'}>Phone</TableCell>
                <TableCell align={'left'}>Location</TableCell>
                <TableCell align={'left'}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>{/* <TableCell>View Memo, Print, Download</TableCell> */}</TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      {/* <AddInflow open={modal} close={toggleModal} /> */}
    </Card>
  )
}

export default Branches
