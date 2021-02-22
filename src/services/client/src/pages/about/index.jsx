import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import FlatPage from '../../components/flat-page'
import useStyles from './style'
import clsx from 'clsx'
import { PACKAGE_DESCRIPTION } from '../../config'

export default () => {
  const classes = useStyles()

  return (
    <>
      <FlatPage>
        <Card className={clsx(classes.card)} variant="outlined">
          <CardHeader style={{ textAlign: 'center' }} title="About" />

          <CardContent>
            <Typography className={clsx(classes.body)} variant="body2">
              {PACKAGE_DESCRIPTION}
            </Typography>
          </CardContent>
        </Card>
      </FlatPage>
    </>
  )
}
