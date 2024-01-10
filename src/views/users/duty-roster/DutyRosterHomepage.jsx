// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** FullCalendar & App Components Imports
import Calendar from 'src/views/apps/calendar/Calendar'
import SidebarLeft from 'src/views/apps/calendar/SidebarLeft'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'
import AddEventSidebar from 'src/views/apps/calendar/AddEventSidebar'

import moment from 'moment'

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
import PageHeader from './PageHeader'
import DownloadTemplateDialog from './DownloadTemplateDialog'
import UploadRosterDialog from './UploadRosterDialog'
import { useRoster } from '../../../hooks/useRoster'
import { fetchRosterDetails } from '../../../store/apps/roster/asyncthunk'
import { formatDateToYYYYMM } from '../../../@core/utils/format'

// ** CalendarColors
const calendarsColor = {
  Personal: 'error',
  Business: 'primary',
  Family: 'warning',
  Holiday: 'success',
  ETC: 'info'
}

const DutyRosterHomepage = () => {
  // ** States
  const [calendarApi, setCalendarApi] = useState(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const [startDate, setStartDate] = useState(moment(new Date()).startOf('year').format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(moment(new Date()).endOf('year').format('YYYY-MM-DD'))
  const [period, setPeriod] = useState(formatDateToYYYYMM(new Date()))
  const [openDownloadDialog, setOpenDialog] = useState(false)
  const [openUploadDialog, setDialog] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElement, setAnchorElement] = useState(null);

  // ** Hooks
  const { settings } = useSettings()
  const dispatch = useDispatch()
  const store = useSelector(state => state.calendar)
  const [RosterData, loading] = useRoster()

  // ** Vars
  const leftSidebarWidth = 300
  const addEventSidebarWidth = 400
  const { skin, direction } = settings
  const mdAbove = useMediaQuery(theme => theme.breakpoints.up('md'))

  const toggleDownloadDialog = (e) => {
    setAnchorEl(e.currentTarget)
    setOpenDialog(!openDownloadDialog)
}

const toggleUploadDialog = (e)=>{
  setAnchorElement(e.currentTarget)
  setDialog(!openUploadDialog)
}

const closeDownloadDialog = ()=> setOpenDialog(!openDownloadDialog)
const closeUploadDialog = ()=> setDialog(!openUploadDialog)

  const handleFilter = () => console.log('toggled')


  // useEffect(() => {
  //   dispatch(fetchEvents(store.selectedCalendars))
  // }, [dispatch, store.selectedCalendars])

  useEffect(()=>{
    dispatch(fetchRosterDetails({departmentId: 5, period: period}))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[period])

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)
  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)

  return (

    <div>
        <PageHeader  
        toggle={toggleDownloadDialog}
        toggleUpload={toggleUploadDialog}
        />

    <CalendarWrapper
      className='app-calendar'
      sx={{
        boxShadow: skin === 'bordered' ? 0 : 6,
        ...(skin === 'bordered' && { border: theme => `1px solid ${theme.palette.divider}` })
      }}
    >
      {/* <SidebarLeft
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
      /> */}
      <Box
        sx={{
          p: 6,
          pb: 0,
          flexGrow: 1,
          borderRadius: 1,
          boxShadow: 'none',
          backgroundColor: 'background.paper',
          ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
        }}
      >
        <Calendar

          // store={store}
          dispatch={dispatch}
          direction={direction}

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
        store={store}
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

      <DownloadTemplateDialog open={openDownloadDialog} anchorEl={anchorEl} handleClose={closeDownloadDialog}/>
      <UploadRosterDialog open={openUploadDialog} anchorEl={anchorElement} handleClose={closeUploadDialog}/>
    </div>
  )
}

export default DutyRosterHomepage
