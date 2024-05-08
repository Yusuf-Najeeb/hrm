import React, { Fragment, useEffect, useState } from 'react'
import { Paper, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'

import { useAppDispatch } from '../../../hooks'
import NoData from '../../../@core/components/emptyData/NoData'
import CustomSpinner from '../../../@core/components/custom-spinner'
import { formatFirstLetter, formatDate } from '../../../@core/utils/format'
import PayrollHeader from './PayrollHeaderCard'
import CreateConfig from './CreateConfig'
import { fetchSalaryItems } from '../../../store/apps/salaryItems/asyncthunk'
import { useSalaryItems } from '../../../hooks/useSalaryItems'

const Config = () => {
  const [fetch, setRefetch] = useState(false)

  const dispatch = useAppDispatch()
  const [SalaryItemsData, loadingSalaryItems] = useSalaryItems()
  console.log(SalaryItemsData)
  const updateFetch = () => setRefetch(!fetch)
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
                  <TableCell>Add Salary Item</TableCell>
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
                  <TableCell>NAME</TableCell>
                  <TableCell>PERCENTAGE</TableCell>
                  <TableCell>MODIFIED BY</TableCell>
                  <TableCell>MODIFIED ON</TableCell>
                  <TableCell>ACTIONS</TableCell>
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
                            <IconButton size='small' onClick={() => doDelete(deduction)}>
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
    </main>
  )
}

export default Config
