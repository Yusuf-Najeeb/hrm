import React, { Fragment, useEffect, useState } from 'react'

// * MUI Imports
import { Paper, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import IconButton from '@mui/material/IconButton'

// ** Utilities and Hooks Imports
import Icon from 'src/@core/components/icon'
import { useAppDispatch } from '../../../hooks'
import NoData from '../../../@core/components/emptyData/NoData'
import { fetchSalaryItems, deleteSalaryItem } from '../../../store/apps/salaryItems/asyncthunk'
import { useSalaryItems } from '../../../hooks/useSalaryItems'
import CustomSpinner from '../../../@core/components/custom-spinner'
import { formatFirstLetter, formatDate } from '../../../@core/utils/format'
import PayrollHeader from './PayrollHeaderCard'
import CreateConfig from './CreateConfig'
import DeleteDialog from '../../../@core/components/delete-dialog'

const Config = () => {
  const [fetch, setRefetch] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  // * Hooks
  const dispatch = useAppDispatch()
  const [SalaryItemsData, loadingSalaryItems] = useSalaryItems()
  const updateFetch = () => setRefetch(!fetch)

  const doDelete = value => {
    setDeleteModal(true)
    setSelectedItem(value?.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSelectedItem(null)
  }

  const onDeleteClick = () => {
    dispatch(deleteSalaryItem(selectedItem))
    updateFetch()
    doCancelDelete()
  }

  useEffect(() => {
    dispatch(fetchSalaryItems())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch])

  return (
    <main>
      <PayrollHeader />
      <Grid container spacing={2} sx={{ mt: 6 }}>
        <Grid item sm={3}>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Create Salary Item</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <CreateConfig refetch={updateFetch} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item sm={9}>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  <TableCell align='left'>NAME</TableCell>
                  <TableCell align='left'>PERCENTAGE</TableCell>
                  <TableCell align='left'>MODIFIED BY</TableCell>
                  <TableCell align='left'>MODIFIED ON</TableCell>
                  <TableCell align='center'>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loadingSalaryItems ? (
                  <TableRow className='text-center'>
                    <TableCell colSpan={6}>
                      <CustomSpinner />
                    </TableCell>
                  </TableRow>
                ) : (
                  <Fragment>
                    {SalaryItemsData?.map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{formatFirstLetter(item?.name)}</TableCell>
                          <TableCell>{`${item?.percentage}%`}</TableCell>
                          <TableCell>
                            {item?.lastChangedBy
                              ? formatFirstLetter(item?.lastChangedBy)
                              : formatFirstLetter(item?.createdBy)}
                          </TableCell>
                          <TableCell>
                            {item?.updatedAt ? formatDate(item?.updatedAt) : formatDate(item?.createdAt)}
                          </TableCell>
                          <TableCell align='center'>
                            <IconButton size='small' onClick={() => editItem(item)}>
                              <Icon icon='tabler:edit' />
                            </IconButton>
                            <IconButton size='small' onClick={() => doDelete(item)}>
                              <Icon icon='tabler:trash' />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                    {SalaryItemsData?.length === 0 && (
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
          </TableContainer>
        </Grid>
      </Grid>

      <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={onDeleteClick} />
    </main>
  )
}

export default Config
