import React, { Fragment, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { colorsProgress } from 'src/configs/colorConfigs'
import { useSalaryItems } from '../../../hooks/useSalaryItems'
import { useAppDispatch } from '../../../hooks'
import { fetchSalaryItems } from '../../../store/apps/salaryItems/asyncthunk'
import CustomSpinner from '../../../@core/components/custom-spinner'
import { formatFirstLetter } from '../../../@core/utils/format'
import NoData from '../../../@core/components/emptyData/NoData'
import CreatePayslipItem from './CreatePayslipItem'

const BorderLinearProgress = styled(LinearProgress)(({ theme, bgc }) => {
  return {
    padding: 4,
    height: 16,
    borderRadius: 5,

    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: `${bgc}`
    }
  }
})

const PayslipsSettings = () => {
  const dispatch = useAppDispatch()
  const [SalaryItemsData, loadingSalaryItems] = useSalaryItems()
  const [openDialog, setOpenDialog] = useState(false)
  const [fetchStatus, setFetchStatus] = useState(false)

  const toggleCreateDialog = ()=> setOpenDialog(!openDialog)
  const refetchSalaryItems = ()=> setFetchStatus(!fetchStatus)


  useEffect(()=>{
    dispatch(fetchSalaryItems())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStatus])

  return (
    <div>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h5' color='textSecondary'>
          Payslips Settings
        </Typography>

        <Button onClick={toggleCreateDialog} variant='contained' startIcon={<Icon icon='tabler:square-rounded-plus' />}>
          Create
        </Button>
      </Stack>
      <KeenSliderWrapper sx={{ mx: 8, my: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={6}>
            <Card>
              {loadingSalaryItems ? (
                <CustomSpinner />
              ) :
              <CardContent>
                {SalaryItemsData.map((item, index) => (
                  <Box key={item?.id} display='flex' flexDirection='column' sx={{ mb: 4 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 2
                      }}
                    >
                      <Typography variant='body2' color='textSecondary'>
                        {formatFirstLetter(item?.name)}
                      </Typography>
                      <Typography variant='body2' color='textSecondary'>{`${item?.percentage}%`}</Typography>
                    </Box>
                    <Box width='100%' mr={1}>
                      <BorderLinearProgress variant='determinate' value={item?.percentage} bgc={`${colorsProgress[index]}`} />
                    </Box>
                  </Box>
                ))}

                  {SalaryItemsData?.length === 0 && (
                  <Box display='flex' flexDirection='column' sx={{ mb: 4 }}>
                    <NoData />
                    </Box>
                )}
              </CardContent>
              }
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Card>
              <CardContent>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align='left'>Name</TableCell>
                      <TableCell align='center'>Percentage</TableCell>
                      <TableCell align='right'>Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {loadingSalaryItems ? (
                      <TableRow className='text-center'>
                      <TableCell colSpan={6}>
                        <CustomSpinner />
                      </TableCell>
                    </TableRow>
                    ) : <Fragment>
                      {SalaryItemsData.map(item => (
                      <TableRow key={item?.id} hover>
                        <TableCell>{formatFirstLetter(item?.name)}</TableCell>
                        <TableCell align='center'>{`${item?.percentage}%`}</TableCell>
                        <TableCell align='right'>
                          <IconButton size='small'>
                            <Icon icon='tabler:edit' />
                          </IconButton>
                          <IconButton size='small'>
                            <Icon icon='tabler:trash' />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}

                    {SalaryItemsData?.length === 0 && (
                  <tr className='text-center'>
                    <td colSpan={6}>
                      <NoData />
                    </td>
                  </tr>
                     )}
                    </Fragment>
                  }
                    
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </KeenSliderWrapper>

      {openDialog && <CreatePayslipItem openDialog={openDialog} closeDialog={toggleCreateDialog} refetchSalaryItems={refetchSalaryItems} />}
    </div>
  )
}

export default PayslipsSettings
