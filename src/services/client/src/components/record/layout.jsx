import React, { useState, useContext } from 'react'
import { Grid, Typography, Chip, Card, CardContent, Fade } from '@material-ui/core'
import { GlobalContext } from '../../modules/provider-global'
import { terrestrisBaseMap } from '../../lib/ol'
import { useHistory } from 'react-router-dom'
import Header from './header'
import { Footer } from '../'
import { OlReact } from '@saeon/ol-react'
import { Link as SimpleLink } from '..'
import WKT from 'ol/format/WKT'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Polygon from 'ol/geom/Polygon'

const CARD_BG_COLOUR = 'rgba(255,255,255,0.85)'

const wkt = new WKT()

const Row = ({ title, children, ...props }) => (
  <Grid item {...props}>
    <Card style={{ backgroundColor: CARD_BG_COLOUR }} variant="outlined">
      <CardContent>
        {
          <Typography gutterBottom variant="overline">
            <b>{title}</b>
          </Typography>
        }
        {children}
      </CardContent>
    </Card>
  </Grid>
)

export default ({ json, id }) => {
  const [codeView, updateCodeView] = useState(false)
  const { setGlobal } = useContext(GlobalContext)
  const history = useHistory()

  if (!id || !json) {
    return 'Record not found'
  }

  return (
    <>
      <Header
        codeView={codeView}
        toggleCodeView={() => updateCodeView(!codeView)}
        id={id}
        record={json}
      />

      <div style={{ margin: '48px 0px 48px' }}>
        <Grid container justify="center">
          <Grid item lg={10} xl={8}>
            {codeView ? (
              <Fade key="1" in={codeView}>
                <Grid
                  container
                  direction="column"
                  justify="space-evenly"
                  alignItems="stretch"
                  spacing={3}
                >
                  <Row style={{ width: '100%' }} title={'Metadata Source JSON'}>
                    <pre style={{ whiteSpace: 'break-spaces' }}>
                      {JSON.stringify(json, null, 2)}
                    </pre>
                  </Row>
                </Grid>
              </Fade>
            ) : (
              <Fade key="2" in={!codeView}>
                <Grid
                  container
                  direction="column"
                  justify="space-evenly"
                  alignItems="stretch"
                  spacing={3}
                >
                  <Row title={'Title'}>
                    <Typography variant="body2" component="h2">
                      {json.titles?.[0].title}
                    </Typography>
                  </Row>

                  <Row title="Author">
                    {json.creators?.map((creator, i) => (
                      <div key={creator.name}>
                        <Typography variant="body2">
                          {creator.name}&nbsp;
                          <sup>[{i + 1}]</sup>
                        </Typography>
                      </div>
                    ))}
                    <br />
                    {json.creators?.map((creator, i) => (
                      <div key={creator.name}>
                        <Typography variant="body2">
                          <sup>[{i + 1}]</sup>&nbsp;
                          {creator.affiliations.map(aff => aff.affiliation)}
                        </Typography>
                      </div>
                    ))}
                  </Row>

                  <Row title={'Spatial covereage'}>
                    <OlReact
                      viewOptions={{
                        smoothExtentConstraint: true,
                        showFullExtent: true,
                        extent: new Polygon(
                          wkt
                            .readGeometry(json.geoLocations[0].geoLocationBox)
                            .getCoordinates()
                            .map(array => array.map(([y, x]) => [x, y]))
                        )
                          .getExtent()
                          .map((v, i) => ((i === 0) | (i === 1) ? v - 1 : v + 1)), // subtract for minX/minY, expand for maxX, maxY
                      }}
                      layers={[
                        new VectorLayer({
                          id: 'extent-layer',
                          title: 'Extent',
                          source: new VectorSource({
                            wrapX: false,
                            features: json.geoLocations.map(
                              ({ geoLocationBox }) =>
                                new Feature({
                                  geometry: new Polygon(
                                    wkt
                                      .readGeometry(geoLocationBox)
                                      .getCoordinates()
                                      .map(array => array.map(([y, x]) => [x, y]))
                                  ),
                                })
                            ),
                          }),
                        }),
                        terrestrisBaseMap(),
                      ]}
                      style={{ height: '350px', position: 'relative' }}
                    />
                  </Row>

                  <Row title="Temporal coverage">
                    {/* TODO These dates are not correct - waiting on updating the plone => ckan integration */}
                    <Typography variant="body2">
                      {`${Math.min(
                        ...json.dates
                          .map(({ date }) => [parseInt(date.lte, 10), parseInt(date.gte, 10)])
                          .flat()
                      )} - ${Math.max(
                        ...json.dates
                          .map(({ date }) => [parseInt(date.lte, 10), parseInt(date.gte, 10)])
                          .flat()
                      )}`}
                    </Typography>
                  </Row>

                  <Row title="Publisher">
                    <Typography variant="body2">{`${json.publisher} (${json.publicationYear})`}</Typography>
                  </Row>

                  <Row title="Contributors">
                    {json.contributors?.map((contributor, i) => (
                      <div key={i}>
                        <Typography variant="body2">
                          ({contributor.contributorType.replace(/([A-Z])/g, ' $1').trim()}){' '}
                          {contributor.name},{contributor.affiliations.map(aff => aff.affiliation)}
                        </Typography>
                      </div>
                    ))}
                  </Row>

                  <Row title={'Abstract'}>
                    <Typography variant="body2">
                      {json.descriptions.map(desc =>
                        desc.descriptionType === 'Abstract' ? desc.description : undefined
                      )}
                    </Typography>
                  </Row>

                  <Row title="Keywords">
                    <Grid container spacing={1} justify="flex-start">
                      {json.subjects
                        .slice(0)
                        .sort((a, b) => (a.subject >= b.subject ? 1 : -1))
                        .map(subject => (
                          <Grid item key={subject.subject}>
                            <Chip
                              size="small"
                              clickable
                              onClick={() => {
                                setGlobal(
                                  {
                                    terms: [
                                      { field: 'subjects.subject.raw', value: subject.subject },
                                    ],
                                  },
                                  true
                                )
                                history.push('/records')
                              }}
                              label={subject.subject.toUpperCase()}
                            />
                          </Grid>
                        ))}
                    </Grid>
                  </Row>

                  <Row title="Resources">
                    {json.linkedResources?.map((lr, i) => (
                      <div key={`linked-resource${i}`}>
                        <SimpleLink uri={lr.resourceURL}>
                          <Typography variant="body2">
                            {`${
                              lr.linkedResourceType === 'Query'
                                ? '(GeoMap)'
                                : `(${lr.linkedResourceType})`
                            } ${lr.resourceDescription}`}
                          </Typography>
                        </SimpleLink>
                      </div>
                    ))}
                  </Row>

                  <Row title="Identifiers">
                    <div>
                      <Typography variant="body2">
                        {json.identifier?.identifier || 'Missing identifier'} (
                        {json.identifier.identifierType})
                      </Typography>
                    </div>
                    {json.alternateIdentifiers.map(ai => (
                      <div key={ai.alternateIdentifier}>
                        <Typography variant="body2">
                          {ai.alternateIdentifier} ({ai.alternateIdentifierType})
                        </Typography>
                      </div>
                    ))}
                  </Row>

                  <Row title="License">
                    <div>
                      {json.rightsList?.map(rl => {
                        return (
                          <div key={rl.rightsURI}>
                            <Typography variant="body2">{rl.rights}</Typography>
                            <SimpleLink key={rl.rightsURI} uri={rl.rightsURI}>
                              <Typography variant="body2">{rl.rightsURI}</Typography>
                            </SimpleLink>
                          </div>
                        )
                      })}
                    </div>
                  </Row>
                </Grid>
              </Fade>
            )}
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  )
}
