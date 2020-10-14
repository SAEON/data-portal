import React from 'react'
import { Grid, Fade } from '@material-ui/core'
import { isMobile } from 'react-device-detect'

// Metadata fields
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

export default ({
  codeView,
  titles,
  creators,
  geoLocations,
  dates,
  publisher,
  publicationYear,
  contributors,
  descriptions,
  subjects,
  linkedResources,
  identifier,
  alternateIdentifiers,
  rightsList,
}) => {
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
              {titles.length ? <Titles titles={titles} /> : undefined}
              {creators.length ? <Creators creators={creators} /> : undefined}
              {geoLocations.length ? <GeoLocations geoLocations={geoLocations} /> : undefined}
              {dates.length ? <Dates dates={dates} /> : undefined}
              {publisher ? (
                <Publisher publisher={publisher} publicationYear={publicationYear} />
              ) : undefined}
              {contributors.length ? <Contributors contributors={contributors} /> : undefined}
              {descriptions.length ? <Descriptions descriptions={descriptions} /> : undefined}
              {subjects.length ? <Subjects subjects={subjects} /> : undefined}
              {linkedResources.length ? (
                <LinkedResources linkedResources={linkedResources} />
              ) : undefined}
              <Identifiers identifier={identifier} alternateIdentifiers={alternateIdentifiers} />
              {rightsList?.length ? <RightsList rightsList={rightsList} /> : undefined}
            </Grid>
          </Fade>
        </Grid>
      </Grid>
    </div>
  )
}
