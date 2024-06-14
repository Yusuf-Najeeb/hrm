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
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiTabList from '@mui/lab/TabList'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import Account from './Account'
import Security from './Security'
import ProfileCard from './ProfileCard'

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

const Profiles = ({ tab }) => {
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
    account: <Account />,
    security: <Security />
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <ProfileCard />
      </Grid>
      {activeTab === undefined ? null : (
        <Grid item xs={8}>
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
                  <TabList variant='scrollable' scrollButtons='auto' onChange={handleChange} aria-label='Profile tabs'>
                    <Tab
                      value='account'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize='1.5rem' icon='oui:app-search-profiler' />
                          {!hideText && 'Account'}
                        </Box>
                      }
                    />
                    <Tab
                      value='security'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize='1.5rem' icon='ph:password-light' />
                          {!hideText && 'Security'}
                        </Box>
                      }
                    />
                    <Tab
                      value='billing'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize='1.125rem' icon='solar:settings-linear' />
                          {!hideText && 'Billing & Plan'}
                        </Box>
                      }
                    />
                    <Tab
                      value='notification'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize='1.125rem' icon='solar:settings-linear' />
                          {!hideText && 'Notification'}
                        </Box>
                      }
                    />
                    <Tab
                      value='connection'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize='1.125rem' icon='solar:settings-linear' />
                          {!hideText && 'Connection'}
                        </Box>
                      }
                    />
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

export default Profiles
