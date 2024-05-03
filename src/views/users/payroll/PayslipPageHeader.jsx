// ** MUI Imports
import { Stack, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useStaffs } from '../../../hooks/useStaffs'

const PageHeader = ({ month, toggle, togglePayment, action1, action2 }) => {
  const [StaffsData] = useStaffs()

  return (
    <Box
      sx={{
        py: 4,

        // px: 6,
        rowGap: 2,

        // columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'end'
      }}
    >
      <Stack direction='row' justifyContent='end' spacing={4}>
        <Button
          onClick={togglePayment}
          variant='outlined'
          disabled={StaffsData?.length == 0}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon fontSize='1.125rem' icon='prime:send' />
          {action1}
        </Button>

        <Button onClick={toggle} variant='contained' disabled={StaffsData?.length == 0} sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          {action2}
        </Button>
      </Stack>
    </Box>
  )
}

export default PageHeader
