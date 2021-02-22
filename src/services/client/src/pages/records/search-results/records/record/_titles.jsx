import { useHistory } from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import clsx from 'clsx'
import useStyles from './style'

export default ({ titles, id }) => {
  const history = useHistory()
  const classes = useStyles()

  return (
    <CardContent className={clsx(classes.titleContent)}>
      <header>
        <Typography
          component={Link}
          onClick={() => history.push(`/records/${id}`)}
          className={clsx(classes.title)}
          variant="h2"
        >
          {titles?.[0]?.title || 'Title missing'}
        </Typography>
      </header>
    </CardContent>
  )
}
