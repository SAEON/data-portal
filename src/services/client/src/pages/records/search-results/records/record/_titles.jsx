import { useHistory } from 'react-router-dom'
import { CardContent, Typography, Link as MuiLink } from '@material-ui/core'
import clsx from 'clsx'
import useStyles from './style'

export default ({ titles, id }) => {
  const history = useHistory()
  const classes = useStyles()

  return (
    <CardContent className={clsx(classes.titleContent)}>
      <Typography
        component={MuiLink}
        onClick={() => history.push(`/records/${id}`)}
        className={clsx(classes.title)}
        variant="h2"
      >
        {titles?.[0]?.title || 'Title missing'}
      </Typography>
    </CardContent>
  )
}
