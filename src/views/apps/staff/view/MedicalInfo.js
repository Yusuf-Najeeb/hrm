import React from 'react'
import { Box, Divider, Grid, Stack, Typography } from '@mui/material'

import Icon from 'src/@core/components/icon'

const MedicalInfo = () => {
  return (
    <div>
      <Divider textAlign='left'>Medical Information</Divider>
      <Grid sx={{ my: 0.5 }} container spacing={6}>
        <Grid item xs={12} md={6} lg={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& svg': { mr: 2, color: 'text.secondary' },
              justifyContent: 'space-between'
            }}
          >
            <Stack direction='row' alignItems='center'>
              <Icon icon='tabler:progress-check' fontSize='1.125rem' />
              <Typography sx={{ color: 'text.secondary' }}>Genotype :</Typography>
            </Stack>

            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography sx={{ color: 'text.secondary', alignSelf: 'center' }}>AA</Typography>
              <Icon icon='tabler:info-circle' fontSize='1.125rem' />
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Box
            sx={{
              display: 'flex',

              alignItems: 'center',
              '& svg': { mr: 2, color: 'text.secondary' },
              justifyContent: 'space-between'
            }}
          >
            <Stack direction='row' alignItems='center'>
              <Icon icon='tabler:progress-check' fontSize='1.125rem' />
              <Typography sx={{ color: 'text.secondary' }}>Surgeries :</Typography>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography sx={{ color: 'text.secondary', alignSelf: 'center' }}>No</Typography>
              <Icon icon='tabler:info-circle' fontSize='1.125rem' />
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Box
            sx={{
              display: 'flex',

              alignItems: 'center',
              '& svg': { mr: 2, color: 'text.secondary' },
              justifyContent: 'space-between'
            }}
          >
            <Stack direction='row' alignItems='center'>
              <Icon icon='tabler:progress-check' fontSize='1.125rem' />
              <Typography sx={{ color: 'text.secondary' }}>Blood Group :</Typography>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography sx={{ color: 'text.secondary', alignSelf: 'center' }}>A+</Typography>
              <Icon icon='tabler:info-circle' fontSize='1.125rem' />
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Box
            sx={{
              display: 'flex',

              alignItems: 'center',
              '& svg': { mr: 2, color: 'text.secondary' },
              justifyContent: 'space-between'
            }}
          >
            <Stack direction='row' alignItems='center'>
              <Icon icon='tabler:progress-check' fontSize='1.125rem' />
              <Typography sx={{ color: 'text.secondary' }}>Allergies :</Typography>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography sx={{ color: 'text.secondary', alignSelf: 'center' }}>Nil</Typography>
              <Icon icon='tabler:info-circle' fontSize='1.125rem' />
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Box
            sx={{
              display: 'flex',

              alignItems: 'center',
              '& svg': { mr: 2, color: 'text.secondary' },
              justifyContent: 'space-between'
            }}
          >
            <Stack direction='row' alignItems='center'>
              <Icon icon='tabler:progress-check' fontSize='1.125rem' />
              <Typography sx={{ color: 'text.secondary' }}>Emergency :</Typography>
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
              <Typography sx={{ color: 'text.secondary', alignSelf: 'center' }}>--</Typography>
              <Icon icon='tabler:info-circle' fontSize='1.125rem' />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default MedicalInfo
