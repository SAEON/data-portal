import React, { useState, useContext } from 'react'
import { Grid, Typography, Chip, Card, CardContent, Fade } from '@material-ui/core'
import { UriStateContext } from '../../modules/provider-uri-state'
import Header from './header'
import { Link as SimpleLink } from '..'
/**TO DO:
 * http://localhost:3001/records/c770a2bfa4108b82725ae1174bf881cd
 * http://www.sasdi.net/metaview.aspx?uuid=c770a2bfa4108b82725ae1174bf881cd#downloads
 * http://www.sasdi.net/metaview.aspx?uuid=1d9fa3fd257fea3ec81b5bc6c8fde61f# citations work here
 */

const Row = ({ title, children, ...props }) => (
  <Grid item {...props}>
    <Card variant="outlined">
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
  const { setUriState } = useContext(UriStateContext)

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

      <div style={{ margin: '24px 0px 48px' }}>
        <Grid container justify="center">
          <Grid item xs={11} sm={8}>
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

                  <Row title="Temporal coverage">
                    <Typography variant="body2">
                      LEO TODO: These are the dates I have access to. Are these correct for temporal
                      coverage?
                    </Typography>
                    <pre>{JSON.stringify(json.dates, null, 2)}</pre>
                  </Row>

                  <Row title="Publisher">
                    <Typography variant="body2">{`${json.publisher} (${json.publicationYear})`}</Typography>
                  </Row>

                  <Row title="Contributors">
                    {json.contributors?.map(contributor => (
                      <div key={contributor.name}>
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
                              onClick={() =>
                                setUriState({
                                  pathname: '/records',
                                  terms: [subject.subject],
                                })
                              }
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
                          {ai.alternateIdentifier} (alternate)
                        </Typography>
                      </div>
                    ))}
                  </Row>

                  <Row title="License">
                    <div>
                      {json.rightsList?.map(rl => {
                        return (
                          <SimpleLink key={rl.rightsURI} uri={rl.rightsURI}>
                            <Typography variant="body2">
                              {rl.rights} [{rl.rightsURI}]
                            </Typography>
                          </SimpleLink>
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
    </>
  )
}