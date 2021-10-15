import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
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
