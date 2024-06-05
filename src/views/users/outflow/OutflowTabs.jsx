// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Components
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiTabList from '@mui/lab/TabList'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import Operating from './Operating'
import Purchase from './Purchase'

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 38,
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 130
    }
  }
}))

const Cashflow = ({ tab }) => {
  // ** State
  const [activeTab, setActiveTab] = useState(tab)

  // ** Hooks
  const router = useRouter()
  const hideText = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const handleChange = (e, value) => {
    setActiveTab(value)

    // router.push({
    //   pathname: `/users/products/finishedProducts/${value.toLowerCase()}`
    // })
  }

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  const tabContentList = {
    operating: <Operating />,
    purchase: <Purchase />
  }

  return (
    <Grid container spacing={6}>
      {activeTab === undefined ? null : (
        <Grid item xs={12}>
          <TabContext value={activeTab}>
            <Grid container spacing={6}>
              <Box
                sx={{
                  width: '100%',
                  mt: theme => theme.spacing(6),
                  px: theme => theme.spacing(7),
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Grid item xs={12}>
                  <TabList variant='scrollable' scrollButtons='auto' onChange={handleChange} aria-label='outflow tabs'>
                    <Tab
                      value='operating'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize='1.5rem' icon='ph:hand-coins-thin' />
                          {!hideText && 'Operating Expense'}
                        </Box>
                      }
                    />
                    <Tab
                      value='purchase'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize='1.5rem' icon='game-icons:pay-money' />
                          {!hideText && 'Purchase Item'}
                        </Box>
                      }
                    />
                    {/* <Tab
                      value='config'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize='1.125rem' icon='solar:settings-linear' />
                          {!hideText && 'Config'}
                        </Box>
                      }
                    /> */}
                  </TabList>
                </Grid>
              </Box>

              <Grid item xs={12}>
                <TabPanel sx={{ p: 0 }} value={activeTab}>
                  {tabContentList[activeTab]}
                </TabPanel>
              </Grid>
            </Grid>
          </TabContext>
        </Grid>
      )}
    </Grid>
  )
}

export default Cashflow
