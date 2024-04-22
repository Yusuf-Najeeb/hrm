// ** React Imports
import { useState, useEffect, forwardRef, Fragment } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'

// ** Store & Actions Imports
import { useDispatch } from 'react-redux'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import TableHeader from './TableHeader'

import { useStaffs } from '../../../hooks/useStaffs'
import { fetchStaffs } from '../../../store/apps/staffs/asyncthunk'
import { formatFirstLetter } from '../../../@core/utils/format'

// import AddStaff from './AddStaff'
import DeleteStaff from './DeleteStaff'
import EditStaffCard from './EditStaffCard'
import { useDepartments } from '../../../hooks/useDepartments'
import { fetchDepartments } from '../../../store/apps/departments/asyncthunk'
import { fetchRoles } from '../../../store/apps/roles/asyncthunk'
import { useRoles } from '../../../hooks/useRoles'

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}))

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}))

// ** renders client column
const renderClient = row => {
  const initials = `${formatFirstLetter(row?.firstname)} ${formatFirstLetter(row?.lastname)}`

  if (row?.image?.length) {
    return (
      <CustomAvatar
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${row?.image}`}
        sx={{ mr: 2.5, width: 38, height: 38 }}
      />
    )
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.id % 2 === 0 ? 'primary' : 'secondary'}
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(initials || 'John Doe')}
      </CustomAvatar>
    )
  }
}

const renderRoleRow = row => {
  return (
    <IconButton component={IconButtonStyled}>
      <Icon
        icon={
          row?.role?.name == 'Admin' || row?.role?.name == 'admin'
            ? 'grommet-icons:user-admin'
            : 'dashicons/admin-users'
        }
      />
    </IconButton>
  )
}

const defaultColumns = [
  //   {
  //     flex: 0.1,
  //     field: 'id',
  //     minWidth: 100,
  //     headerName: 'ID',
  //     renderCell: ({ row }) => (
  //       <Typography component={LinkStyled} href={`/apps/invoice/preview/${row.id}`}>{`#${row.id}`}</Typography>
  //     )
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
  {
    field: 'id',
    headerName: 'S/N',
    filterable: false,
    renderCell: index => (
      <Typography component={TypographyStyled}>
        {' '}
        {index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1}{' '}
      </Typography>
    )
  },

  {
    flex: 0.25,
    field: 'firstname',
    minWidth: 320,
    headerName: 'Staff',
    renderCell: ({ row }) => {
      const { firstname, lastname, email } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {`${firstname.toUpperCase()} ${lastname.toUpperCase()}`}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
              {email}
            </Typography>
          </Box>
        </Box>
      )
    }
  },

  {
    flex: 0.15,
    minWidth: 140,
    field: 'department.name',
    filterable: false,
    headerName: 'Department',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row?.department.name}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 140,
    field: 'role.name',
    filterable: false,
    headerName: 'Role',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderRoleRow(row)}
          <Typography sx={{ color: 'text.secondary' }}>{formatFirstLetter(row?.role?.name) || '--'}</Typography>
        </Box>
      )
    }
  },

  {
    flex: 0.1,
    minWidth: 100,
    field: 'grossSalary',
    filterable: false,
    headerName: 'Gross Salary',
    renderCell: ({ row }) => (
      <Typography sx={{ color: 'text.secondary' }}>{`#${row?.grossSalary.toLocaleString() || 0}`}</Typography>
    )
  }
]

/* eslint-disable */
const CustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates
  return <CustomTextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})

/* eslint-enable */
const StaffsList = () => {
  const [StaffsData, loading, paging] = useStaffs()
  const [DepartmentsData] = useDepartments()
  const [RolesData] = useRoles()

  // ** State
  const [page, setPage] = useState(0)
  const [dates, setDates] = useState([])
  const [value, setValue] = useState('')
  const [statusValue, setStatusValue] = useState('')
  const [endDateRange, setEndDateRange] = useState(null)
  const [selectedRows, setSelectedRows] = useState([])
  const [startDateRange, setStartDateRange] = useState(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [addStaffOpen, setAddstaffOpen] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [openEditDrawer, setEditDrawer] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [staffToEdit, setStaffToEdit] = useState(null)
  const [showAddStaffModal, setShowAddStaffModal] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDepartments({ page: 1, limit: 300 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch])

  useEffect(() => {
    dispatch(fetchRoles({ page: 1, limit: 200 }))
    dispatch(fetchStaffs({ page: page + 1 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, refetch])

  const toggleAddStaffModal = () => {
    setShowAddStaffModal(!showAddStaffModal)
  }

  const handleFilter = val => {
    setValue(val)
  }

  const handleStatusValue = e => {
    setStatusValue(e.target.value)
  }

  const doDelete = value => {
    setDeleteModal(true)
    setSelectedStaff(value?.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSelectedStaff(null)
  }

  const updateFetch = () => setFetch(!refetch)

  const handleOnChangeRange = dates => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

  // Handle Edit dialog
  const setStaffToUpdate = value => {
    setEditDrawer(true)
    setStaffToEdit(value)
  }

  const handleEditClose = () => {
    setStaffToEdit(null)
    setEditDrawer(false)
  }

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 140,
      sortable: false,
      filterable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Edit Staff'>
            <IconButton size='small' onClick={() => setStaffToUpdate(row)}>
              <Icon icon='tabler:edit' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete Staff'>
            <IconButton size='small' sx={{ color: 'text.secondary' }} onClick={() => doDelete(row)}>
              <Icon icon='tabler:trash' />
            </IconButton>
          </Tooltip>

          {/* <Tooltip title='View'>
            <IconButton
              size='small'
              component={Link}
              sx={{ color: 'text.secondary' }}
              href={`/apps/invoice/preview/${row.id}`}
            >
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip> */}

          {/* <OptionsMenu
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
            options={[
              {
                text: 'Download',
                icon: <Icon icon='tabler:download' fontSize={20} />
              },
              {
                text: 'Edit',
                href: `/apps/invoice/edit/${row.id}`,
                icon: <Icon icon='tabler:edit' fontSize={20} />
              },
              {
                text: 'Duplicate',
                icon: <Icon icon='tabler:copy' fontSize={20} />
              }
            ]}
          /> */}
        </Box>
      )
    }
  ]

  return (
    <Fragment>
      <DatePickerWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title='Filters' />
              <CardContent>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      select
                      fullWidth
                      label='Department'
                      SelectProps={{ value: statusValue, onChange: e => handleStatusValue(e) }}
                    >
                      <MenuItem value=''>Select Department</MenuItem>
                      {DepartmentsData?.map(department => (
                        <MenuItem key={department?.id} value={department?.id}>
                          {formatFirstLetter(department?.name)}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      select
                      fullWidth
                      label='Role'
                      SelectProps={{ value: statusValue, onChange: e => handleStatusValue(e) }}
                    >
                      <MenuItem value=''>Select Role</MenuItem>
                      {RolesData?.map(role => (
                        <MenuItem key={role?.id} value={role?.id}>
                          {formatFirstLetter(role?.name)}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <TableHeader value={value} handleFilter={handleFilter} clickAddBtn={toggleAddStaffModal} />
              <DataGrid
                autoHeight
                pagination
                rowHeight={62}
                rows={StaffsData?.length ? StaffsData : []}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                onRowSelectionModelChange={rows => setSelectedRows(rows)}
              />
            </Card>
          </Grid>
        </Grid>
      </DatePickerWrapper>

      {/* <AddStaff open={showAddStaffModal} closeModal={toggleAddStaffModal} refetchStaffs={updateFetch} /> */}

      <DeleteStaff
        open={deleteModal}
        handleClose={doCancelDelete}
        selectedStaff={selectedStaff}
        refetchStaffs={updateFetch}
      />
      <EditStaffCard openEdit={openEditDrawer} closeModal={handleEditClose} data={staffToEdit} />
    </Fragment>
  )
}

export default StaffsList
