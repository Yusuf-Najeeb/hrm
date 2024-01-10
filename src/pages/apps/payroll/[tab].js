import { useState, useEffect, ReactElement, SyntheticEvent } from 'react'
import { useRouter } from 'next/router'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/material/TabPanel'
import TabContext from '@mui/material/TabContext'

import { styled, Theme } from '@mui/material/styled'
import { useMediaQuery } from '@mui/material/useMediaQuery'
import MuiTableList,  
