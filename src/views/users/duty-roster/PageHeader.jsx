
// ** MUI Imports
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'


// ** Icon Imports
import Icon from 'src/@core/components/icon'


const PageHeader = ({ toggle, toggleUpload,  }) => {

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
        <Box sx={{}}>
          <Typography></Typography>
        </Box>
      


<Box sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
 <Button onClick={toggle} aria-describedby='download-popover' variant='contained' sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='material-symbols:download' />
          Download Template
        </Button>
        

<Button onClick={toggleUpload} variant='outlined' sx={{ '& svg': { mr: 2 } }}>
        <Icon fontSize='1.125rem' icon='tabler:plus' />
        Upload Roster
      </Button>

      </Box>
    </Box>
  )
}

export default PageHeader
