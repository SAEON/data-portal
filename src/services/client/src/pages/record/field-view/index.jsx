import { Grid, Fade } from '@material-ui/core'
import { isMobile } from 'react-device-detect'
import Titles from './_titles'
import Creators from './_creators'
import GeoLocations from './_geo-locations'
import Dates from './_dates'
import Publisher from './_publisher'
import Contributors from './_contributors'
import Descriptions from './_descriptions'
import Subjects from './_subjects'
import LinkedResources from './_linked-resources'
import Identifiers from './_identifiers'
import RightsList from './_rights-list'
import ResourceType from './_resource-type'

/**
 * Fields correlate to fields in the metadata docs
 * i.e. 'Abstract', and 'Methodology' are both in
 * the descriptions field. Therefore there is a
 * single component for both these fields (Descriptions)
 */
export default ({ codeView, ..._source }) => {
  return (
    <div style={{ margin: isMobile ? '16px 0 16px' : '32px 0px 32px' }}>
      <Grid container justify="center">
        <Grid item lg={10} xl={8}>
          <Fade key="field-view" in={!codeView}>
            <Grid
              container
              direction="column"
              justify="space-evenly"
              alignItems="stretch"
              spacing={isMobile ? 2 : 3}
            >
              {_source.titles?.length && <Titles {..._source} />}
              {_source.creators?.length && <Creators {..._source} />}
              {_source.rightsList?.length && <RightsList {..._source} />}
              {_source.geoLocations?.length && <GeoLocations {..._source} />}
              {_source.dates?.length && <Dates {..._source} />}
              {_source.publisher && <Publisher {..._source} />}
              {_source.contributors?.length && <Contributors {..._source} />}
              {_source.descriptions?.length && <Descriptions {..._source} />}
              {<ResourceType {..._source} />}
              {_source.subjects?.length && <Subjects {..._source} />}
              {_source.linkedResources?.length && <LinkedResources {..._source} />}
              {_source.identifiers?.length && <Identifiers {..._source} />}
            </Grid>
          </Fade>
        </Grid>
      </Grid>
    </div>
  )
}
