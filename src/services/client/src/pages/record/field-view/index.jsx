import Grid from '@material-ui/core/Grid'
import Fade from '@material-ui/core/Fade'
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
import ResourceType from './_resource-type'
import ImmutableResource from './_immutable-resource'

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
            <Grid container direction="column" justify="space-evenly" alignItems="stretch">
              {/* TITLE */}
              {_source.titles?.length && <Titles {..._source} />}
              {/* AUTHOR */}
              {_source.creators?.length && <Creators {..._source} />}
              {/* CONTRIBUTORS */}
              {_source.contributors?.length && <Contributors {..._source} />}
              {/* PUBLISHER */}
              {_source.publisher && <Publisher {..._source} />}
              {/* DESCRIPTIONS */}
              {_source.descriptions?.length && <Descriptions {..._source} />}
              {/* DOWNLOAD */}
              {_source.immutableResource && <ImmutableResource {..._source} />}
              {/* SPATIAL COVERAGE */}
              {_source.geoLocations?.length && <GeoLocations {..._source} />}
              {/* TEMPORAL COVERAGE */}
              {_source.dates?.length && <Dates {..._source} />}
              {/* RESOURCE TYPE */}
              {<ResourceType {..._source} />}
              {/* KEYWORDS */}
              {_source.subjects?.length && <Subjects {..._source} />}
              {/* RESOURCES */}
              {_source.linkedResources?.length && <LinkedResources {..._source} />}
              {/* IDENTIFIERS */}
              {_source.identifiers?.length && <Identifiers {..._source} />}
            </Grid>
          </Fade>
        </Grid>
      </Grid>
    </div>
  )
}
