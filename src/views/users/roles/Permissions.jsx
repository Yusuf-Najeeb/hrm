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
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component & Hooks Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { formatFirstLetter } from '../../../@core/utils/format'
import { fetchPermissions } from '../../../store/apps/permissions/asyncthunk'
import { usePermissions } from '../../../hooks/usePermissions'
import { useAppDispatch } from '../../../hooks'

const Permissions = ({ open, closeModal, dialogTitle }) => {
  const dispatch = useAppDispatch()
  const [PermissionsData] = usePermissions()

  const [permissionsId, setPermissionsId] = useState([])
  const [allPermissions, setAllPermissions] = useState([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState(false)
  const [selectAll, setSelectAll] = useState(false)
  const [anchorEl, setAnchorEl] = useState(Array(PermissionsData?.length)?.fill(null))

  const handleRowOptionsClick = (event, index) => {
    const newAnchorEl = [...anchorEl]
    newAnchorEl[index] = event.currentTarget
    setAnchorEl(newAnchorEl)
  }

  const handleRowOptionsClose = index => {
    const newAnchorEl = [...anchorEl]
    newAnchorEl[index] = null
    setAnchorEl(newAnchorEl)
  }

  const handleChange = id => {
    if (permissionsId.includes(id)) {
      const newIds = permissionsId.filter(perm => perm !== id)
      setPermissionsId([...newIds])
    } else {
      setPermissionsId(prev => [...prev, id])
    }
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectAll(false)
      setPermissionsId([])
    } else {
      setPermissionsId(allPermissions.map(item => item.id))
      setSelectAll(true)
    }
  }

  const handleClose = () => {
    setIsIndeterminateCheckbox(false)
    closeModal()
  }

  useEffect(() => {
    if (permissionsId?.length > 0 && permissionsId?.length < allPermissions?.length) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
    // eslint-disable-next-line
  }, [permissionsId])

  useEffect(() => {
    dispatch(fetchPermissions())

    const reduceAllPermissions = PermissionsData.map(perm => perm?.permissions)
    const flattenedArray = reduceAllPermissions.flatMap(item => item)
    const getIds = flattenedArray.map(item => item?.id)

    setAllPermissions(flattenedArray)
    setPermissionsId(getIds)

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dialog fullWidth maxWidth='lg' scroll='body' onClose={closeModal} open={open}>
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
                        checked={permissionsId?.length === allPermissions?.length}
                      />
                    }
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {PermissionsData.map(role => {
                return (
                  <TableRow key={role?.id} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        fontSize: theme => theme.typography.h6.fontSize
                      }}
                    >
                      {role?.name.toUpperCase()}
                    </TableCell>
                    {role?.permissions?.map((permission, i) => (
                      <TableCell key={i}>
                        <FormControlLabel
                          label={formatFirstLetter(permission?.name)}
                          sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                          control={
                            <Checkbox
                              size='small'
                              id={role?.id}
                              checked={permissionsId?.includes(permission?.id)}
                              onChange={() => handleChange(permission?.id)}
                            />
                          }
                        />
                      </TableCell>
                    ))}
                    <>
                      <IconButton size='small' onClick={event => handleRowOptionsClick(event, i)}>
                        <Icon icon='tabler:dots-vertical' />
                      </IconButton>
                      <Menu
                        keepMounted
                        anchorEl={anchorEl[i]}
                        open={Boolean(anchorEl[i])}
                        onClose={() => handleRowOptionsClose(i)}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right'
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right'
                        }}
                        PaperProps={{ style: { minWidth: '8rem' } }}
                      >
                        <MenuItem onClick={() => setStudentToEdit(item)} sx={{ '& svg': { mr: 2 } }}>
                          <Icon icon='tabler:edit' fontSize={20} />
                          Edit Student
                        </MenuItem>
                        <MenuItem onClick={() => setStudentToView(item)} sx={{ '& svg': { mr: 2 } }}>
                          <Icon icon='tabler:eye' fontSize={20} />
                          View Student
                        </MenuItem>

                        <MenuItem onClick={() => setStudentToAssignClassRoom(item)} sx={{ '& svg': { mr: 2 } }}>
                          <Icon icon='fluent:stack-add-20-filled' fontSize={20} />
                          Change Class
                        </MenuItem>
                        <MenuItem onClick={() => setStudentToAssignSubjects(item)} sx={{ '& svg': { mr: 2 } }}>
                          <Icon icon='fluent:stack-add-20-filled' fontSize={20} />
                          Assign Subject
                        </MenuItem>
                        {item.boarder && (
                          <MenuItem
                            onClick={() => setStudentToAssignHostelCategories(item)}
                            sx={{ '& svg': { mr: 2 } }}
                          >
                            <Icon icon='clarity:assign-user-solid' fontSize={20} />
                            Assign Hostel Room
                          </MenuItem>
                        )}
                      </Menu>
                    </>
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
