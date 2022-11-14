import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import FlatPage, { H, P } from '../../components/flat-page'
import { alpha } from '@mui/material/styles'

export default () => {
  return (
    <>
      <FlatPage>
        <Card
          sx={theme => ({
            backgroundColor: alpha(theme.palette.common.white, 0.9),
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
          })}
          variant="outlined"
        >
          <CardHeader style={{ textAlign: 'center' }} title="Terms of Use" />

          <CardContent>
            <P>
              By accessing data from the South African Environmental Observation Network (SAEON)
              Open Data Platform (ODP) repository and its components, you affirm your acceptance of
              the following terms and conditions:
            </P>

            <H>(1)</H>

            <P>
              You have read, understood, and agreed to the disclaimer. Data are included under this
              disclaimer.
            </P>

            <H>(2)</H>

            <P>
              These data are made available with the express understanding that any such use will
              properly acknowledge the originator(s) and publisher and cite the associated Digital
              Object Identifiers. Anyone wishing to use these data should properly cite and
              attribute the data providers listed as authors in the metadata provided with each
              dataset. It is expected that all the conditions of the data license will be strictly
              honoured. Use of any material herein should be properly cited using the dataset&apos;s
              persistent identifiers such as DOIs.
            </P>

            <H>(3)</H>

            <P>
              You acknowledge that you have read, understood, and agreed to the SAEON Data Policy.
            </P>

            <H>(4)</H>

            <P>
              You acknowledge that SAEON does not guarantee that the data will be available to you
              without interruption or error. Furthermore, SAEON may modify or remove datasets and
              data service access methods at will.
            </P>
          </CardContent>
        </Card>
      </FlatPage>
    </>
  )
}
