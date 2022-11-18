import Delete from './delete'
import Save from './save'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import { alpha } from '@mui/material/styles'

export default props => {
  return (
    <Card
      sx={{ backgroundColor: theme => alpha(theme.palette.common.white, 0.9) }}
      variant="outlined"
    >
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Save />
        <Delete {...props} />
      </CardActions>
    </Card>
  )
}
