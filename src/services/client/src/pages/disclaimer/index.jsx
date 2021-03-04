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
          <CardHeader style={{ textAlign: 'center' }} title="Disclaimer" />
          <CardContent>
            <Typography className={clsx(classes.body)} variant="body2">
              While every reasonable effort is made to maintain current and accurate information on
              this site, the South African Environment Observation Network (SAEON) accepts no
              responsibility for any error or omission on these pages or any site to which the site
              pages link, or for direct or indirect damage as a result of the usage or quoting the
              content on the site or the information delivered or not delivered or as a result of
              the downloading of computer files or the usage of computer programs available on the
              site.
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              Where appropriate, external links have been provided for the user’s convenience. SAEON
              is not responsible for the content or reliability of linked websites and does not
              necessarily endorse the views expressed in them. Listing shall not be taken as
              endorsement of any kind. SAEON cannot guarantee that these links will work all of the
              time and has no control over the availability of the linked sites or pages.
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              SAEON provides metadata descriptions and links to its own data and that of others in
              the community of practice, in the belief that this will be useful and in support of
              Open Access to scientific publications and data. We cannot be held responsible for the
              quality of data provided by third parties, and while we take reasonable care in
              referencing these datasets, the content of both metadata and data is under control of
              the third-party provider.
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              The SAEON Open Data Platform and its contents are provided on an “as is” and “as
              available” basis and have not been compiled or supplied to meet the User’s individual
              requirements.
            </Typography>
          </CardContent>
        </Card>
      </FlatPage>
    </>
  )
}
