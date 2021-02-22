import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import FlatPage from '../../components/flat-page'
import useStyles from './style'
import clsx from 'clsx'

export default () => {
  const classes = useStyles()

  return (
    <>
      <FlatPage>
        <Card className={clsx(classes.card)} variant="outlined">
          <CardHeader style={{ textAlign: 'center' }} title="Terms of Use" />

          <CardContent>
            <Typography className={clsx(classes.body)} variant="body2">
              By accessing data from the South African Environmental Observation Network (SAEON)
              Open Data Platform (ODP) repository and its components, you affirm your acceptance of
              the following terms and conditions:
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              (1)
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              You have read, understood, and agreed to the disclaimer. Data are included under this
              disclaimer.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              (2)
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              These data are made available with the express understanding that any such use will
              properly acknowledge the originator(s) and publisher and cite the associated Digital
              Object Identifiers. Anyone wishing to use these data should properly cite and
              attribute the data providers listed as authors in the metadata provided with each
              dataset. It is expected that all the conditions of the data license will be strictly
              honoured. Use of any material herein should be properly cited using the dataset’s
              persistent identifiers such as DOIs.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              (3)
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              You acknowledge that you have read, understood, and agreed to the SAEON Data Policy.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              (4)
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              You acknowledge that SAEON does not guarantee that the data will be available to you
              without interruption or error. Furthermore, SAEON may modify or remove datasets and
              data service access methods at will.
            </Typography>
          </CardContent>
        </Card>
      </FlatPage>
    </>
  )
}
