import React from 'react'
import { Box, Divider, Grid, Stack, Typography } from '@mui/material'

import Icon from 'src/@core/components/icon'

const NokInfo = () => {
  return (
    <div>
      <Divider textAlign='left'>Next Of Kin Information</Divider>

      <Grid sx={{ my: 0.5 }} container spacing={6}>
        <Grid item xs={12} md={6} lg={6}>
          <Box
            sx={{
              display: 'flex',
              mb: 2,
              alignItems: 'center',
              '& svg': { mr: 2, color: 'text.secondary' },
              justifyContent: 'space-between'
            }}
          >
            <Stack direction='row' alignItems='center'>
              <Icon icon='tabler:progress-check' fontSize='1.125rem' />
              <Typography sx={{ color: 'text.secondary' }}>Title :</Typography>
            </Stack>

            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography sx={{ color: 'text.secondary', alignSelf: 'center' }}>Mr</Typography>
              <Icon icon='tabler:info-circle' fontSize='1.125rem' />
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Box
            sx={{
              display: 'flex',
              mb: 2,
              alignItems: 'center',
              '& svg': { mr: 2, color: 'text.secondary' },
              justifyContent: 'space-between'
            }}
          >
            <Stack direction='row' alignItems='center'>
              <Icon icon='tabler:progress-check' fontSize='1.125rem' />
              <Typography sx={{ color: 'text.secondary' }}>Occupation :</Typography>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography sx={{ color: 'text.secondary', alignSelf: 'center' }}>software developer</Typography>
              <Icon icon='tabler:info-circle' fontSize='1.125rem' />
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Box
            sx={{
              display: 'flex',
              mb: 2,
              alignItems: 'center',
              '& svg': { mr: 2, color: 'text.secondary' },
              justifyContent: 'space-between'
            }}
          >
            <Stack direction='row' alignItems='center'>
              <Icon icon='tabler:progress-check' fontSize='1.125rem' />
              <Typography sx={{ color: 'text.secondary' }}>Name :</Typography>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography sx={{ color: 'text.secondary', alignSelf: 'center' }}>Tylerjusfly</Typography>
              <Icon icon='tabler:info-circle' fontSize='1.125rem' />
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Box
            sx={{
              display: 'flex',
              mb: 2,
              alignItems: 'center',
              '& svg': { mr: 2, color: 'text.secondary' },
              justifyContent: 'space-between'
            }}
          >
            <Stack direction='row' alignItems='center'>
              <Icon icon='tabler:progress-check' fontSize='1.125rem' />
              <Typography sx={{ color: 'text.secondary' }}>Mobile :</Typography>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography sx={{ color: 'text.secondary', alignSelf: 'center' }}>--</Typography>
              <Icon icon='tabler:info-circle' fontSize='1.125rem' />
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Box
            sx={{
              display: 'flex',
              mb: 2,
              alignItems: 'center',
              '& svg': { mr: 2, color: 'text.secondary' },
              justifyContent: 'space-between'
            }}
          >
            <Stack direction='row' alignItems='center'>
              <Icon icon='tabler:progress-check' fontSize='1.125rem' />
              <Typography sx={{ color: 'text.secondary' }}>Email :</Typography>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography sx={{ color: 'text.secondary', alignSelf: 'center' }}>--</Typography>
              <Icon icon='tabler:info-circle' fontSize='1.125rem' />
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Box
            sx={{
              display: 'flex',
              mb: 2,
              alignItems: 'center',
              '& svg': { mr: 2, color: 'text.secondary' },
              justifyContent: 'space-between'
            }}
          >
            <Stack direction='row' alignItems='center'>
              <Icon icon='tabler:progress-check' fontSize='1.125rem' />
              <Typography sx={{ color: 'text.secondary' }}>Relationship :</Typography>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography sx={{ color: 'text.secondary', alignSelf: 'center' }}>Son</Typography>
              <Icon icon='tabler:info-circle' fontSize='1.125rem' />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default NokInfo
