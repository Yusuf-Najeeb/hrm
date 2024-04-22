// ** Next Import
// import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'

// import MenuItem from '@mui/material/MenuItem'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

const TableHeader = props => {
  // ** Props
  const { value, handleFilter, clickAddBtn } = props

  return (
    <Box
      sx={{
        ml: 16.5,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'end',
        justifyContent: 'space-between'
      }}
    >
      <div></div>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <CustomTextField
          value={value}
          sx={{ mr: 4, mb: 0 }}
          placeholder='Search Staffs'
          onChange={e => handleFilter(e.target.value)}
        />
        <Button sx={{ mb: 0 }} onClick={clickAddBtn} variant='contained'>
          <Icon icon='mdi:plus' fontSize={20} />
          Add Staff
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
