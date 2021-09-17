import { useContext } from 'react'
import { context as configContext } from '../../../../../config'
import { useHistory } from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import clsx from 'clsx'
import useStyles from './style'

export default ({ titles, id }) => {
  const { contentBase } = useContext(configContext)
  const history = useHistory()
  const classes = useStyles()

  return (
    <header>
      <CardContent className={clsx(classes.titleContent)}>
        <Typography
          tabIndex="0"
          component={Link}
          onClick={() => history.push(`${contentBase}/records/${id}`)}
          className={clsx(classes.title)}
          variant="h2"
        >
          {titles?.[0]?.title || 'Title missing'}
        </Typography>
      </CardContent>
    </header>
  )
}
