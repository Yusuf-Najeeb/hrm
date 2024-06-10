import React from 'react'
import Cards from '../../../views/users/dashboard-overview/Cards'
import DailyAttendance from './DailyAttendance'
import LeaveOverview from './LeaveOverview'
import ProjectOverview from './ProjectOverview'
import { Stack } from '@mui/system'

const Dashboard = () => {
  return (
    <main>
      <Cards />
      <DailyAttendance />
      <Stack direction='row' spacing={2}>
        <LeaveOverview />
        <ProjectOverview />
      </Stack>
    </main>
  )
}

export default Dashboard
