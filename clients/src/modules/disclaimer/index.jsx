import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import FlatPage, { P } from '../../components/flat-page'
import { alpha } from '@mui/material/styles'

export default () => {
  return (
    <>
      <FlatPage>
        <Card
          sx={theme => ({
            backgroundColor: alpha(theme.palette.common.white, 0.9),
            my: 2,
          })}
          variant="outlined"
        >
          <CardHeader sx={{ textAlign: 'center' }} title="Disclaimer" />
          <CardContent>
            <P>
              While every reasonable effort is made to maintain current and accurate information on
              this site, the South African Environment Observation Network (SAEON) accepts no
              responsibility for any error or omission on these pages or any site to which the site
              pages link, or for direct or indirect damage as a result of the usage or quoting the
              content on the site or the information delivered or not delivered or as a result of
              the downloading of computer files or the usage of computer programs available on the
              site.
            </P>

            <P>
              Where appropriate, external links have been provided for the user’s convenience. SAEON
              is not responsible for the content or reliability of linked websites and does not
              necessarily endorse the views expressed in them. Listing shall not be taken as
              endorsement of any kind. SAEON cannot guarantee that these links will work all of the
              time and has no control over the availability of the linked sites or pages.
            </P>

            <P>
              SAEON provides metadata descriptions and links to its own data and that of others in
              the community of practice, in the belief that this will be useful and in support of
              Open Access to scientific publications and data. We cannot be held responsible for the
              quality of data provided by third parties, and while we take reasonable care in
              referencing these datasets, the content of both metadata and data is under control of
              the third-party provider.
            </P>

            <P>
              The SAEON Open Data Platform and its contents are provided on an “as is” and “as
              available” basis and have not been compiled or supplied to meet the User’s individual
              requirements.
            </P>
          </CardContent>
        </Card>
      </FlatPage>
    </>
  )
}
