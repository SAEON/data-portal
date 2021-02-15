import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import FlatPage from '../../components/flat-page'
import useStyles from './style'
import clsx from 'clsx'
import {
  CATALOGUE_CURATOR_CONTACT,
  CATALOGUE_TECHNICAL_CONTACT,
  CATALOGUE_LEGAL_CONTACT,
} from '../../config'

export default () => {
  const classes = useStyles()

  return (
    <>
      <FlatPage>
        <Card className={clsx(classes.card)} variant="outlined">
          <CardHeader style={{ textAlign: 'center' }} title="Contact us" />
          <CardContent>
            <Typography className={clsx(classes.h2)} variant="h6">
              Feedback and general enquiries (we love this!)
            </Typography>
            <Typography className={clsx(classes.body)} variant="body2">
              {CATALOGUE_TECHNICAL_CONTACT.replace('@', ' [ at ] ')}
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Legal contact
            </Typography>
            <Typography className={clsx(classes.body)} variant="body2">
              {CATALOGUE_LEGAL_CONTACT.replace('@', ' [ at ] ')}
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Technical contact
            </Typography>
            <Typography className={clsx(classes.body)} variant="body2">
              {CATALOGUE_TECHNICAL_CONTACT.replace('@', ' [ at ] ')}
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Data curation contact
            </Typography>
            <Typography className={clsx(classes.body)} variant="body2">
              {CATALOGUE_CURATOR_CONTACT.replace('@', ' [ at ] ')}
            </Typography>
          </CardContent>
        </Card>
      </FlatPage>
    </>
  )
}
