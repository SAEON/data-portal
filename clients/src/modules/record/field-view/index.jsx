import Grid from '@mui/material/Grid'
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
import RelatedIdentifiers from './_related-identifiers'

/**
 * Fields correlate to fields in the metadata docs
 * i.e. 'Abstract', and 'Methodology' are both in
 * the descriptions field. Therefore there is a
 * single component for both these fields (Descriptions)
 */
export default ({ ..._source }) => {
  return (
    <Grid container direction="column" justifyContent="space-evenly" alignItems="stretch">
      {/* TITLE */}
      {Boolean(_source.titles?.length) && <Titles {..._source} />}

      {/* AUTHOR */}
      {Boolean(_source.creators?.length) && <Creators {..._source} />}

      {/* CONTRIBUTORS */}
      {Boolean(_source.contributors?.length) && <Contributors {..._source} />}

      {/* PUBLISHER */}
      {_source.publisher && <Publisher {..._source} />}

      {/* DESCRIPTIONS */}
      {Boolean(_source.descriptions?.length) && <Descriptions {..._source} />}

      {/* DOWNLOAD */}
      {_source.immutableResource && <ImmutableResource {..._source} />}

      {/* SPATIAL COVERAGE */}
      {Boolean(_source.geoLocations?.filter(Boolean)?.length) && <GeoLocations {..._source} />}

      {/* TEMPORAL COVERAGE */}
      {Boolean(_source.dates?.length) && <Dates {..._source} />}

      {/* RESOURCE TYPE */}
      {<ResourceType {..._source} />}

      {/* KEYWORDS */}
      {Boolean(_source.subjects?.length) && <Subjects {..._source} />}

      {/* RESOURCES */}
      {Boolean(_source.linkedResources?.length) && <LinkedResources {..._source} />}

      {/* IDENTIFIERS */}
      {_source.identifiers?.length && <Identifiers {..._source} />}

      {/* RELATED IDENTIFIERS */}
      {Boolean(_source.relatedIdentifiers?.length) && <RelatedIdentifiers {..._source} />}
    </Grid>
  )
}
