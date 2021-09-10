import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import YesIcon from 'mdi-react/TickIcon'
import NoIcon from 'mdi-react/NoIcon'
import useTheme from '@material-ui/core/styles/useTheme'

export default ({ search }) => {
  const theme = useTheme()

  return (
    <Card variant="outlined">
      <CardHeader title="Search" subheader="Configure list search DSL object" />
      <CardContent>
        <div
          style={{ padding: theme.spacing(1), maxHeight: 400, overflow: 'auto' }}
          contentEditable
        >
          <pre style={{ maxHeight: 800, overflow: 'auto' }}>{JSON.stringify(search, null, 2)}</pre>
        </div>
      </CardContent>
      <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button size="small" startIcon={<NoIcon size={18} />} variant="text" disableElevation>
          Cancel
        </Button>
        <Button size="small" startIcon={<YesIcon size={18} />} variant="text" disableElevation>
          Confirm
        </Button>
      </CardActions>
    </Card>
  )
}
