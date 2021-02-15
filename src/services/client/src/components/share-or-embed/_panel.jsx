import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'

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
            <Typography style={{ wordBreak: 'break-all' }}>{children}</Typography>
          </Box>
        )}
      </div>
    </Fade>
  )
}
