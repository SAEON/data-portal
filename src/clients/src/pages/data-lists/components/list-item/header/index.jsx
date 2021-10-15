import Delete from './delete'
import Save from './save'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import { useTheme } from '@mui/material/styles'

export default props => {
  const theme = useTheme()

  return (
    <Card style={{ backgroundColor: theme.backgroundColor }} variant="outlined">
      <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Save />
        <Delete {...props} />
      </CardActions>
    </Card>
  )
}
