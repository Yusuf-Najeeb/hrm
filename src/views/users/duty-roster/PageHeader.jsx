import { Dispatch, SetStateAction, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useAppDispatch } from '../../../hooks'
import dayjs from 'dayjs'

import { DatePicker } from 'antd'



// import { fetchExpenditure } from 'src/store/apps/expenditure/asyncthunk'
// import { notifySuccess } from 'src/@core/components/toasts/notifySuccess'

const { RangePicker } = DatePicker



const PageHeader = ({ toggle, toggleUpload }) => {
  const dispatch = useAppDispatch()


//   const filterExpenditure = () => {
//     dispatch(fetchExpenditure({ page: 1, count: 10, startDate, endDate }))
//   }


  // const onCalendarChange = (dates) => {
  //   const startdate = (dates?.[0]).format('YYYY-MM-DD')
  //   const enddate = (dates?.[1]).format('YYYY-MM-DD')

  //   // console.log(startdate, enddate);
  //   setStartDate(startdate)
  //   setEndDate(enddate)
  // }

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Stack direction='row' justifyContent='space-between' spacing={4}>
        <Button color='primary' variant='tonal' startIcon={<Icon icon='tabler:filter' />} onClick={()=> {console.log('filter')}}>
          Filter
        </Button>
      </Stack>

      {/* <CustomTextField
        value={value}
        sx={{ mr: 4 }}
        placeholder='Search Expenditures'
        onChange={e => handleFilter(e.target.value)}
      /> */}

<Box sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
 <Button onClick={toggle} aria-describedby='download-popover' variant='contained' sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='material-symbols:download' />
          Download Template
        </Button>
        

<Button onClick={toggleUpload} variant='outlined' sx={{ '& svg': { mr: 2 } }}>
        <Icon fontSize='1.125rem' icon='tabler:plus' />
        Upload Roster
      </Button>

      </Box>
    </Box>
  )
}

export default PageHeader
