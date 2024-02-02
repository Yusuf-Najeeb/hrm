import { CircularProgress } from '@mui/material'

const SubmitSpinnerMessage = () => {
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> <small>Submitting</small></div>
  )
}

export default SubmitSpinnerMessage