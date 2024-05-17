// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component & Hooks Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { fetchPermissions } from '../../../store/apps/permissions/asyncthunk'
import { usePermissions } from '../../../hooks/usePermissions'
import { useAppDispatch } from '../../../hooks'

const Permissions = ({ open, closeModal, dialogTitle }) => {
  const dispatch = useAppDispatch()
  const [PermissionsData] = usePermissions()

  const [allPermissions, setAllPermissions] = useState([])
  const [checkedPermissions, setCheckedPermissions] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState(false)

  console.log(PermissionsData)
  console.log(allPermissions)

  const handleChange = id => {
    setAllPermissions(prev => {
      const updateStatus = [...prev]
      const matchingIndex = updateStatus.findIndex(item => item.id === id)

      if (matchingIndex !== -1) {
        updateStatus[matchingIndex] = {
          ...updateStatus[matchingIndex],
          active: !updateStatus[matchingIndex].active
        }
      }

      return updateStatus
    })
  }

  const handleSelectAll = e => {
    const newSelectAll = e.target.checked // Get the checked state of "select all"

    setCheckedPermissions(prevActiveValues => {
      const newValue = newSelectAll ? Array(prevActiveValues.length).fill(true) : []

      return newValue
    })

    setSelectAll(newSelectAll) // Update "select all" state for UI
  }

  // const handleSelectAllClick = () => {
  //   const allChecked = Object.values(checkedPermissions).every(Boolean)
  //   const updatedPermissions = []
  //   for (const item of PermissionsData) {
  //     for (const perm of item.permissions) {
  //       updatedPermissions[perm.id] = !allChecked
  //     }
  //   }
  //   setCheckedPermissions(updatedPermissions)
  // }

  const handleClose = () => {
    setCheckedPermissions([])
    setIsIndeterminateCheckbox(false)
    closeModal()
  }

  const handleCheckboxClick = id => {
    console.log(id)

    // setCheckedPermissions(prevState => [
    //   {
    //     ...prevState,
    //     [id]: !prevState[id]
    //   }
    // ])

    // const arr = checkedPermissions
    // console.log(arr, 'before')
    // if (checkedPermissions.includes(id)) {
    //   arr.splice(arr.indexOf(id), 1)
    //   console.log(arr, 'removed')
    //   setCheckedPermissions([...arr])
    // } else {
    //   arr.push(id)
    //   console.log(arr, 'added')
    //   setCheckedPermissions([...arr])
    // }
  }

  useEffect(() => {
    if (checkedPermissions.length > 0 && checkedPermissions.length < PermissionsData.length * 5) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
    // eslint-disable-next-line
  }, [checkedPermissions])

  useEffect(() => {
    dispatch(fetchPermissions())

    const reduceAllPermissions = PermissionsData.map(perm => perm.permissions)
    const flattenedArray = reduceAllPermissions.flatMap(item => item)

    setAllPermissions(flattenedArray)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dialog fullWidth maxWidth='md' scroll='body' onClose={closeModal} open={open}>
      <DialogTitle
        component='div'
        sx={{
          textAlign: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Typography variant='h3'>{`${dialogTitle} Role`}</Typography>
        <Typography color='text.secondary'>Set Role Permissions</Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(5)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <Box sx={{ my: 4 }}>
          <FormControl fullWidth>
            <CustomTextField fullWidth label='Role Name' placeholder='Enter Role Name' />
          </FormControl>
        </Box>
        <Typography variant='h4'>Role Permissions</Typography>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ pl: '0 !important' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      whiteSpace: 'nowrap',
                      alignItems: 'center',
                      textTransform: 'capitalize',
                      '& svg': { ml: 1, cursor: 'pointer' },
                      color: theme => theme.palette.text.secondary,
                      fontSize: theme => theme.typography.h6.fontSize
                    }}
                  >
                    Administrator Access
                    <Tooltip placement='top' title='Allows a full access to the system'>
                      <Box sx={{ display: 'flex' }}>
                        <Icon icon='tabler:info-circle' fontSize='1.25rem' />
                      </Box>
                    </Tooltip>
                  </Box>
                </TableCell>

                <TableCell colSpan={3}>
                  <FormControlLabel
                    label='Select All'
                    sx={{ '& .MuiTypography-root': { textTransform: 'capitalize', color: 'text.secondary' } }}
                    control={
                      <Checkbox
                        size='small'
                        onChange={handleSelectAll}
                        indeterminate={isIndeterminateCheckbox}
                        checked={allPermissions.length === PermissionsData.length * 5}
                      />
                    }
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {PermissionsData.map(role => {
                const id = role.name.toLowerCase().split(' ').join('-')

                return (
                  <TableRow key={role?.id} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        fontSize: theme => theme.typography.h6.fontSize
                      }}
                    >
                      {role?.name}
                    </TableCell>
                    {role?.permissions?.map((permission, i) => (
                      <TableCell key={i}>
                        <FormControlLabel
                          label={permission?.name}
                          sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                          control={
                            <Checkbox
                              size='small'
                              id={role?.id}
                              checked={permission?.active}
                              onChange={() => handleChange(permission.id)}
                            />
                          }
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Box className='demo-space-x'>
          <Button type='submit' variant='contained'>
            Submit
          </Button>
          <Button color='secondary' variant='tonal' onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default Permissions
