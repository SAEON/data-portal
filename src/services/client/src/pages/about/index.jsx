import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import FlatPage from '../../components/flat-page'
import useStyles from './style'
import clsx from 'clsx'
import { PACKAGE_DESCRIPTION, PACKAGE_KEYWORDS } from '../../config'

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

            <Typography className={clsx(classes.h2)} variant="h6">
              Keywords
            </Typography>
            <Grid container spacing={1} justify="flex-start">
              {PACKAGE_KEYWORDS.sort((a, b) => (a >= b ? 1 : -1)).map(kw => (
                <Grid item key={kw}>
                  <Chip size="small" color="primary" label={kw.toUpperCase()} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </FlatPage>
    </>
  )
}
