// ** React Imports
import { useEffect, useState, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'
import { useRoster } from '../../../hooks/useRoster'

// ** FullCalendar & App Components Imports
import Calendar from 'src/views/apps/calendar/Calendar'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'

// Third party libraries
import DatePicker from 'react-datepicker'

// ** Redux Imports
import { useSelector } from 'react-redux'

import PageHeader from './PageHeader'
import DownloadTemplateDialog from './DownloadTemplateDialog'
import UploadRosterDialog from './UploadRosterDialog'
import AddEventSidebar from 'src/views/apps/calendar/AddEventSidebar'
import SidebarLeft from 'src/views/apps/calendar/SidebarLeft'
import InfoDialog from './InfoDialog'

import { fetchRosterDetails } from '../../../store/apps/roster/asyncthunk'
import { formatDateToYYYYMM, formatFirstLetter, formatMonthYear, getFirstId } from '../../../@core/utils/format'
import { Card, CardContent, CardHeader, Grid, MenuItem } from '@mui/material'
import { useAppDispatch } from '../../../hooks'
import { useDepartments } from '../../../hooks/useDepartments'
import { fetchDepartments } from '../../../store/apps/departments/asyncthunk'

// ** Actions
import {
  addEvent,
  fetchEvents,
  deleteEvent,
  updateEvent,
  handleSelectEvent,
  handleAllCalendars,
  handleCalendarsUpdate
} from 'src/store/apps/calendar'

const CustomInput = forwardRef((props, ref) => {
  const rosterPeriod = props.period !== null ? formatMonthYear(props.period) : ''

  const value = rosterPeriod
  const updatedProps = { ...props }

  return <CustomTextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})

// ** CalendarColors
const calendarsColor = {
  Personal: 'error',
  Business: 'primary',
  Family: 'warning',
  Holiday: 'success',
  ETC: 'info'
}

const DutyRosterHomepage = () => {
  // ** Hooks
  const { settings } = useSettings()
  const [RosterData, loading] = useRoster()
  const store = useSelector(store => store.calendar)

  const dispatch = useAppDispatch()

  const [DepartmentsData] = useDepartments()

  const defaultId = getFirstId(DepartmentsData)

  // ** States
  const [calendarApi, setCalendarApi] = useState(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false)
  const [period, setPeriod] = useState(formatDateToYYYYMM(new Date()))
  const [openDownloadDialog, setOpenDialog] = useState(false)
  const [openUploadDialog, setDialog] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorElement, setAnchorElement] = useState(null)
  const [departmentId, setDepartmentId] = useState()
  const [selectedId, setSelectedId] = useState()
  const [departmentName, setDepartmentName] = useState('')
  const [defaultDepartmentName, setDefaultDepartmentName] = useState('')
  const [infoModal, setModal] = useState(false)

  const defaultPeriod = formatDateToYYYYMM(new Date())

  // ** Vars
  const leftSidebarWidth = 300
  const addEventSidebarWidth = 400
  const { skin, direction } = settings
  const mdAbove = useMediaQuery(theme => theme.breakpoints.up('md'))

  const handleChangeDepartment = e => {
    setDepartmentId(e.target.value)
  }

  const handleChangePeriod = e => {
    const year = e.getFullYear()
    const month = String(e.getMonth() + 1).padStart(2, '0') // Adding 1 as months are zero-based

    const periodValue = new Date(year, month - 1, 1)

    const newPeriodYear = periodValue.getFullYear()
    const newPeriodMonth = String(e.getMonth() + 1).padStart(2, '0')

    const newPeriodValue = `${newPeriodYear}${newPeriodMonth}`

    setPeriod(newPeriodValue)
    setSelectedId(departmentId)

    const selectedDept = DepartmentsData?.find(dept => dept?.id == departmentId)

    selectedDept && setDepartmentName(selectedDept?.name)
  }

  const toggleModal = () => {
    setModal(!infoModal)
  }

  const toggleDownloadDialog = e => {
    setAnchorEl(e.currentTarget)
    setOpenDialog(!openDownloadDialog)
  }

  const toggleUploadDialog = e => {
    setAnchorElement(e.currentTarget)
    setDialog(!openUploadDialog)
  }

  const closeDownloadDialog = () => setOpenDialog(!openDownloadDialog)
  const closeUploadDialog = () => setDialog(!openUploadDialog)

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)
  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)

  console.log(defaultDepartmentName, 'default department')

  useEffect(() => {
    if (defaultId) {
      const Dept = DepartmentsData?.find(dept => dept?.id == defaultId)

      setDefaultDepartmentName(Dept?.name)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultId, DepartmentsData])

  useEffect(() => {
    if (DepartmentsData.length > 0) {
      const initialDepartmentId = getFirstId(DepartmentsData)
      const initialDepartmentName = DepartmentsData[initialDepartmentId]?.name || ''
      setDepartmentName(initialDepartmentName)
    }
  }, [DepartmentsData])

  useEffect(() => {
    dispatch(fetchDepartments({ page: 1, limit: 200 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(
      fetchRosterDetails({ departmentId: selectedId ? selectedId : defaultId, period: period ? period : defaultPeriod })
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, defaultId])

  return (
    <div>
      <Card sx={{ width: '100%' }}>
        <CardHeader title='Filters' />
        <CardContent>
          <Grid container spacing={3} sx={{ display: 'flex' }}>
            <Grid item xs={12} md={6} lg={3}>
              <CustomTextField
                select
                fullWidth
                label='Department'
                //eslint-disable-next-line
                // placeholderText='he'
                placeholderText={`${DepartmentsData[defaultId]?.name}`}
                SelectProps={{ value: departmentId, onChange: e => handleChangeDepartment(e) }}
              >
                <MenuItem value=''>Select Department</MenuItem>
                {DepartmentsData?.map(department => (
                  <MenuItem key={department?.id} value={department?.id}>
                    {formatFirstLetter(department?.name)}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid item xs={12} md={6} lg={3} sx={{ mb: { xs: 4, sm: 1 } }}>
              <DatePicker
                //eslint-disable-next-line
                // selected={period}
                dateFormat='MMM y'
                popperPlacement='bottom-end'
                showMonthYearPicker
                minDate={new Date()}
                onChange={e => {
                  handleChangePeriod(e)
                }}
                placeholderText='MM/YYYY'
                customInput={<CustomInput period={period} autoComplete='off' label='Period' />}
              />
            </Grid>
            <PageHeader toggle={toggleDownloadDialog} toggleUpload={toggleUploadDialog} />
          </Grid>
        </CardContent>
      </Card>

      <CalendarWrapper
        className='app-calendar'
        sx={{
          boxShadow: skin === 'bordered' ? 0 : 6,
          ...(skin === 'bordered' && { border: theme => `1px solid ${theme.palette.divider}` })
        }}
      >
        <SidebarLeft
          store={store}
          mdAbove={mdAbove}
          dispatch={dispatch}
          calendarApi={calendarApi}
          calendarsColor={calendarsColor}
          leftSidebarOpen={leftSidebarOpen}
          leftSidebarWidth={leftSidebarWidth}
          handleSelectEvent={handleSelectEvent}
          handleAllCalendars={handleAllCalendars}
          handleCalendarsUpdate={handleCalendarsUpdate}
          handleLeftSidebarToggle={handleLeftSidebarToggle}
          handleAddEventSidebarToggle={handleAddEventSidebarToggle}
          departmentName={departmentName}
          defaultDepartmentName={defaultDepartmentName}
        />

        <Box
          sx={{
            p: 6,

            // height: '90vh',
            pb: 0,
            flexGrow: 1,
            borderRadius: 1,
            boxShadow: 'none',
            backgroundColor: 'background.paper',
            ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
          }}
        >
          <Calendar
            store={RosterData}
            dispatch={dispatch}
            direction={direction}
            // eslint-disable-next-line no-undef
            // updateEvent={updateEvent}
            calendarApi={calendarApi}
            calendarsColor={calendarsColor}
            setCalendarApi={setCalendarApi}
            handleSelectEvent={handleSelectEvent}
            handleLeftSidebarToggle={handleLeftSidebarToggle}
            handleAddEventSidebarToggle={handleAddEventSidebarToggle}
          />
        </Box>

        {/* <AddEventSidebar
        store={RosterData}
        dispatch={dispatch}
        addEvent={addEvent}
        updateEvent={updateEvent}
        deleteEvent={deleteEvent}
        calendarApi={calendarApi}
        drawerWidth={addEventSidebarWidth}
        handleSelectEvent={handleSelectEvent}
        addEventSidebarOpen={addEventSidebarOpen}
        handleAddEventSidebarToggle={handleAddEventSidebarToggle}
      /> */}
      </CalendarWrapper>

      {infoModal && <InfoDialog openModal={toggleModal} closeModal={toggleModal} />}

      <DownloadTemplateDialog open={openDownloadDialog} anchorEl={anchorEl} handleClose={closeDownloadDialog} />
      <UploadRosterDialog open={openUploadDialog} anchorEl={anchorElement} handleClose={closeUploadDialog} />
    </div>
  )
}

export default DutyRosterHomepage
