import { Card, Fade } from '@material-ui/core'
import Header from './header'
import Authors from './_authors'
import Descriptions from './_descriptions'
import Titles from './_titles'
import clsx from 'clsx'
import useStyles from './style'

export default _source => {
  const classes = useStyles()

  return (
    <Fade in={true} timeout={(Math.floor(Math.random() * 1.5) + 0.1) * 1000} key={_source.id}>
      <span>
        <Card className={clsx(classes.card)} variant="outlined">
          <Header {..._source} />
          <Titles {..._source} />
          <Authors {..._source} />
          <Descriptions {..._source} />
        </Card>
      </span>
    </Fade>
  )
}
