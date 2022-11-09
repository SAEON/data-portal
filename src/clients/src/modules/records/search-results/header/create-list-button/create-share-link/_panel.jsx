import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'

export default props => {
  const { children, value, index, ...other } = props

  return (
    <Fade in={value === index}>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography sx={{ wordBreak: 'break-all' }}>{children}</Typography>
          </Box>
        )}
      </div>
    </Fade>
  )
}
