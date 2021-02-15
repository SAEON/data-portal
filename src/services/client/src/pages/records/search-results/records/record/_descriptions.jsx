import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import useStyles from './style'

export default ({ descriptions }) => {
  const classes = useStyles()

  return (
    <CardContent className={clsx(classes.descriptionContent)}>
      <Typography className={clsx(classes.description)} variant="body2">
        {descriptions?.[0]?.description?.truncate(530) || 'No description'}
      </Typography>
    </CardContent>
  )
}
