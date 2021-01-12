import { useHistory } from 'react-router-dom'
import { CardContent, Typography, Link as MuiLink } from '@material-ui/core'
import clsx from 'clsx'
import useStyles from './style'

export default ({ descriptions, id }) => {
  const history = useHistory()
  const classes = useStyles()

  return (
    <CardContent className={clsx(classes.descriptionContent)}>
      <Typography
        onClick={() => history.push(`/records/${id}`)}
        component={MuiLink}
        className={clsx(classes.description)}
        variant="body2"
      >
        {descriptions?.[0]?.description?.truncate(530) || 'No description'}
      </Typography>
    </CardContent>
  )
}
