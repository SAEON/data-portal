import Delete from './delete'
import Save from './save'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import useTheme from '@material-ui/core/styles/useTheme'

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
