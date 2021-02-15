import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import useStyles from './style'

export default ({ creators }) => {
  const classes = useStyles()

  return (
    <CardContent className={clsx(classes.authorContent)}>
      <Typography className={clsx(classes.author)} variant="overline">
        {creators?.map(({ name }) => name).join(', ') || 'Creator info missing'}
      </Typography>
    </CardContent>
  )
}
