import Delete from './delete'
import Save from './save'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import { useTheme, alpha } from '@mui/material/styles'

export default props => {
  const theme = useTheme()

  return (
    <Card style={{ backgroundColor: alpha(theme.palette.common.white, 0.9) }} variant="outlined">
      <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Save />
        <Delete {...props} />
      </CardActions>
    </Card>
  )
}
