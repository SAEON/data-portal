import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import FlatPage from '../../components/flat-page'
import useStyles from './style'
import clsx from 'clsx'
import { CURATOR_CONTACT, CATALOGUE_TECHNICAL_CONTACT } from '../../config'

export default () => {
  const classes = useStyles()

  return (
    <>
      <FlatPage>
        <Card className={clsx(classes.card)} variant="outlined">
          <CardHeader style={{ textAlign: 'center' }} title="Contact us" />
          <CardContent>
            <Typography className={clsx(classes.h2)} variant="h6">
              Website and technical feedback
            </Typography>
            <Typography className={clsx(classes.body)} variant="body2">
              {CATALOGUE_TECHNICAL_CONTACT.replace('@', ' [ at ] ')}
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Data enquiries
            </Typography>
            <Typography className={clsx(classes.body)} variant="body2">
              {CURATOR_CONTACT.replace('@', ' [ at ] ')}
            </Typography>
          </CardContent>
        </Card>
      </FlatPage>
    </>
  )
}
