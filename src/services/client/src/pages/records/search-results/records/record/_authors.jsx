import { CardContent, Typography } from '@material-ui/core'
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
