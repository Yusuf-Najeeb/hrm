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
        ml: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'end',
        justifyContent: 'space-between',
        gap: 4
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'end',
          justifyContent: { xs: 'flex-start', lg: 'end' },
          gap: 6,
          mt: { xs: 4, lg: 0 }
        }}
      >
        <CustomTextField value={value} placeholder='Search Staffs' onChange={e => handleFilter(e.target.value)} />

        <Button sx={{ mb: 0 }} onClick={clickAddBtn} variant='contained'>
          <Icon icon='mdi:plus' fontSize={20} />
          Add Staff
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
