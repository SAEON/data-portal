import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

export default () => {
  return (
    <Card variant="outlined">
      <Typography variant="overline" sx={{ display: 'block', textAlign: 'center' }}>
        User feedback
      </Typography>
    </Card>
  )
}
