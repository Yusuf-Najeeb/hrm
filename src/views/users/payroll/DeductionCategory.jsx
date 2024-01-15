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

import { useAppDispatch } from '../../../hooks'

import CustomSpinner from '../../../@core/components/custom-spinner'
import { formatFirstLetter } from '../../../@core/utils/format'
import NoData from '../../../@core/components/emptyData/NoData'

import CreateDeductionItem from './CreateDeduction'
import DeleteDialog from '../../../@core/components/delete-dialog'
import { deleteDeduction, fetchDeductionCategory } from '../../../store/apps/deductionCatergory/asyncthunk'
import { usedDeductionCategory } from '../../../hooks/usePayroll'

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

const Deduction = () => {
  const dispatch = useAppDispatch()
  const [deductioncategoryData, loading] = usedDeductionCategory()
  const [openDialog, setOpenDialog] = useState(false)
  const [fetchStatus, setFetchStatus] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [openEditDrawer, setEditDrawer] = useState(false)

  const [selectedDeductionCategory, setSelectedDeductionCategory] = useState(null)

  const toggleCreateDialog = () => setOpenDialog(!openDialog)

  const doDelete = value => {
    setDeleteModal(true)
    setSelectedDeductionCategory(value?.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSelectedDeductionCategory(null)
  }

  const updateFetch = () => setFetchStatus(!fetchStatus)

  const ondeleteClick = () => {
    dispatch(deleteDeduction(selectedDeductionCategory))
    updateFetch()
    doCancelDelete()
  }

  //   const setSalaryItemToEdit = prod => {
  //     setEditDrawer(true)
  //     setSalaryItemToView(prod)
  //   }

  //const toggleEditDrawer = () => setEditDrawer(!openEditDrawer)

  useEffect(() => {
    dispatch(fetchDeductionCategory())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStatus])

  return (
    <div>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h5' color='textSecondary'></Typography>

        <Button onClick={toggleCreateDialog} variant='contained' startIcon={<Icon icon='tabler:square-rounded-plus' />}>
          Create Deductions
        </Button>
      </Stack>
      <KeenSliderWrapper sx={{ mx: 8, my: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={6}>
            <Card>
              {loading ? (
                <CustomSpinner />
              ) : (
                <CardContent>
                  {deductioncategoryData?.map((item, index) => (
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
                        <BorderLinearProgress
                          variant='determinate'
                          value={item?.percentage}
                          bgc={`${colorsProgress[index]}`}
                        />
                      </Box>
                    </Box>
                  ))}

                  {deductioncategoryData?.length === 0 && (
                    <Box display='flex' flexDirection='column' sx={{ mb: 4 }}>
                      <NoData />
                    </Box>
                  )}
                </CardContent>
              )}
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
                    {loading ? (
                      <TableRow className='text-center'>
                        <TableCell colSpan={6}>
                          <CustomSpinner />
                        </TableCell>
                      </TableRow>
                    ) : (
                      <Fragment>
                        {deductioncategoryData?.map(item => (
                          <TableRow key={item?.id} hover>
                            <TableCell>{formatFirstLetter(item?.name)}</TableCell>
                            <TableCell align='center'>{`${item?.percentage}%`}</TableCell>
                            <TableCell align='right'>
                              {/* <IconButton size='small' onClick={() => setSalaryItemToEdit(item)}>
                                <Icon icon='tabler:edit' />
                              </IconButton> */}
                              <IconButton size='small' onClick={() => doDelete(item)}>
                                <Icon icon='tabler:trash' />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}

                        {deductioncategoryData?.length === 0 && (
                          <tr className='text-center'>
                            <td colSpan={6}>
                              <NoData />
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </KeenSliderWrapper>

      <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />

      {openDialog && (
        <CreateDeductionItem
          openDialog={openDialog}
          closeDialog={toggleCreateDialog}
          refetchDeductionCategory={updateFetch}
        />
      )}
    </div>
  )
}

export default Deduction
