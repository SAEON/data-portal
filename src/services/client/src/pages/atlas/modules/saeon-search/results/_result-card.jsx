import React, { useState } from 'react'
import clsx from 'clsx'
import useStyles from './style'
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Collapse,
  CardActions,
  Button,
  Chip,
  Link,
  IconButton,
  Checkbox,
  Tooltip,
  ListItemIcon,
  ListItemSecondaryAction,
  CardMedia,
  CardActionArea,
  Typography,
} from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon, Visibility as VisibilityIcon } from '@material-ui/icons'
import npmUrl from 'url'
import { createLayer, LayerTypes } from '../../../../../lib/ol'
import LegendContent from './_legend'
import { useSnackbar } from 'notistack'

import { CATALOGUE_API_ADDRESS } from '../../../../../config'
const SPATIALDATA_PROXY = `${CATALOGUE_API_ADDRESS}/proxy/saeon-spatialdata`

export default ({ _source, proxy }) => {
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()
  const [contributorsExpanded, setContributorsExpanded] = useState(false)
  const [creatorsExpanded, setCreatorsExpanded] = useState(false)
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)
  const [rightsExpanded, setRightsExpanded] = useState(false)

  const {
    alternateIdentifiers,
    titles,
    publisher,
    publicationYear,
    contributors,
    creators,
    descriptions,
    subjects,
    linkedResources,
    rightsList,
  } = _source

  // TODO - this should be for individual, togglable layers
  let thumbnailAddress
  if (linkedResources?.length) {
    const linkedResource = linkedResources.find(
      ({ linkedResourceType }) => linkedResourceType.toLowerCase() === 'query'
    )
    if (linkedResource) {
      const { resourceURL } = linkedResource
      thumbnailAddress = resourceURL.replace('application/openlayers', 'image/png')
    }
  }

  return (
    <Card variant="outlined" style={{ margin: '5px 0' }}>
      {alternateIdentifiers?.map(({ alternateIdentifier }, i, arr) => (
        <Link
          href={`http://www.sasdi.net/metaview.aspx?uuid=${alternateIdentifier}`}
          key={i}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Tooltip title={`View full record at http://www.sasdi.net/metaview.aspx`}>
            <CardActionArea>
              <CardMedia
                className={classes.img}
                component="img"
                height={140 / arr?.length || 1}
                src={thumbnailAddress}
              />
              <CardContent
                style={{
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                  height: 140 / arr?.length || 1,
                }}
              >
                <Typography style={{ lineBreak: 'anywhere' }} variant="h6">
                  {titles?.map(({ title }) => title).join(', ')}
                </Typography>
                <Typography
                  style={{ lineBreak: 'anywhere' }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  {`${publisher} (${publicationYear})`}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Tooltip>
        </Link>
      ))}

      {/* Subjects */}
      <CardContent>
        {subjects?.map(({ subject }, i) => (
          <Chip
            key={i}
            style={{ margin: 5 }}
            clickable
            variant="default"
            size="small"
            label={subject}
          />
        ))}
      </CardContent>

      {/* Linked resources (map layers) */}
      <CardContent>
        <List>
          {linkedResources?.map(({ resourceURL, resourceDescription, linkedResourceType }, i) => {
            const uri = npmUrl.parse(resourceURL, true)
            const { pathname, query, port, hostname } = uri
            const { layers } = query
            const layerId = `${resourceDescription} - ${layers}`
            return linkedResourceType.toLowerCase() !== 'query' ? (
              <Tooltip
                key={i}
                title={`${linkedResourceType}: This is not a layer that can be added to the map - click the info icon to learn more about this resource`}
              >
                <ListItem dense disableGutters key={i} role={undefined}>
                  <ListItemIcon>
                    <Checkbox disabled />
                  </ListItemIcon>
                  <ListItemText primary={linkedResourceType} secondary={resourceDescription} />
                  <ListItemSecondaryAction>
                    <Link key={i} target="_blank" rel="noopener noreferrer" href={resourceURL}>
                      <IconButton edge="end">
                        <VisibilityIcon />
                      </IconButton>
                    </Link>
                  </ListItemSecondaryAction>
                </ListItem>
              </Tooltip>
            ) : (
              <Tooltip key={i} title={`${linkedResourceType}: ${resourceURL}`}>
                <ListItem dense disableGutters key={i} role={undefined}>
                  <ListItemIcon>
                    <Checkbox
                      checked={Boolean(proxy.getLayerById(layerId))}
                      onChange={({ target }) => {
                        if (port && hostname && pathname) {
                          if (target.checked) {
                            let serverAddress = `${SPATIALDATA_PROXY}/${hostname}/${port}${pathname}`
                            proxy.addLayer(
                              createLayer({
                                LegendMenu: () => (
                                  <LegendContent
                                    title={layerId}
                                    uri={`${serverAddress}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&TRANSPARENT=true&LAYER=${layers}&LEGEND_OPTIONS=forceLabels:on`}
                                  />
                                ),
                                layerType: LayerTypes.TileWMS,
                                id: layerId,
                                title: layerId,
                                uri: serverAddress,
                                LAYERS: layers,
                              })
                            )
                          } else {
                            proxy.removeLayerById(layerId)
                          }
                        } else {
                          enqueueSnackbar(
                            `This layer has a URI that we don't understand yet. We are working to improve this, and it should be available soon! : ${hostname}, ${port}, ${pathname}`,
                            { variant: 'info' }
                          )
                        }
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={linkedResourceType} secondary={resourceDescription} />
                  <ListItemSecondaryAction>
                    <Link key={i} target="_blank" rel="noopener noreferrer" href={resourceURL}>
                      <IconButton edge="end">
                        <VisibilityIcon />
                      </IconButton>
                    </Link>
                  </ListItemSecondaryAction>
                </ListItem>
              </Tooltip>
            )
          })}
        </List>
      </CardContent>

      <CardActions disableSpacing>
        {/* Toggle description */}
        <Button
          onClick={() => setDescriptionExpanded(!descriptionExpanded)}
          aria-expanded={descriptionExpanded}
          aria-label="Show contributors"
          variant="text"
          size="small"
          endIcon={
            <ExpandMoreIcon
              className={clsx(classes.expand, {
                [classes.expandOpen]: descriptionExpanded,
              })}
            />
          }
        >
          Description
        </Button>

        {/* Toggle contributors */}
        <Button
          onClick={() => setContributorsExpanded(!contributorsExpanded)}
          aria-expanded={contributorsExpanded}
          aria-label="Show contributors"
          variant="text"
          size="small"
          endIcon={
            <ExpandMoreIcon
              className={clsx(classes.expand, {
                [classes.expandOpen]: contributorsExpanded,
              })}
            />
          }
        >
          Contributors
        </Button>

        {/* Toggle creators */}
        <Button
          onClick={() => setCreatorsExpanded(!creatorsExpanded)}
          aria-expanded={creatorsExpanded}
          aria-label="Show contributors"
          variant="text"
          size="small"
          endIcon={
            <ExpandMoreIcon
              className={clsx(classes.expand, {
                [classes.expandOpen]: creatorsExpanded,
              })}
            />
          }
        >
          Creators
        </Button>

        {/* Toggle Rights */}
        <Button
          onClick={() => setRightsExpanded(!rightsExpanded)}
          aria-expanded={rightsExpanded}
          aria-label="Show contributors"
          variant="text"
          size="small"
          endIcon={
            <ExpandMoreIcon
              className={clsx(classes.expand, {
                [classes.expandOpen]: rightsExpanded,
              })}
            />
          }
        >
          Rights
        </Button>
      </CardActions>

      {/* Description */}
      <Collapse in={descriptionExpanded} timeout="auto" unmountOnExit>
        <CardContent title="Description">
          <List>
            {descriptions?.map(({ description }, i) => {
              return (
                <ListItem key={i} role={undefined} dense>
                  <ListItemText primary={description} />
                </ListItem>
              )
            })}
          </List>
        </CardContent>
      </Collapse>

      {/* Creators */}
      <Collapse in={creatorsExpanded} timeout="auto" unmountOnExit>
        <CardContent title="Creators">
          <List>
            {creators?.map(({ name, affiliations }, i) => {
              return (
                <ListItem key={i} role={undefined} dense>
                  <ListItemAvatar>
                    <Avatar>{name[0] || '?'}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={name}
                    secondary={affiliations?.map(({ affiliation }) => affiliation).join(', ')}
                  />
                </ListItem>
              )
            })}
          </List>
        </CardContent>
      </Collapse>

      {/* Contributors */}
      <Collapse in={contributorsExpanded} timeout="auto" unmountOnExit>
        <CardContent title="Contributors">
          <List>
            {contributors?.map(({ name, affiliations }, i) => {
              return (
                <ListItem key={i} role={undefined} dense>
                  <ListItemAvatar>
                    <Avatar>{name[0] || '?'}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={name}
                    secondary={affiliations?.map(({ affiliation }) => affiliation).join(', ')}
                  />
                </ListItem>
              )
            })}
          </List>
        </CardContent>
      </Collapse>

      {/* Rights list */}
      <Collapse in={rightsExpanded} timeout="auto" unmountOnExit>
        <CardContent title="Rights">
          <List>
            {rightsList?.map(({ rights, rightsURI }, i) => {
              return (
                <ListItem key={i} role={undefined} dense>
                  <ListItemAvatar>
                    <Avatar>{rights[0] || '?'}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={rights}
                    secondary={
                      <Link key={i} target="_blank" rel="noopener noreferrer" href={rightsURI}>
                        View rights
                      </Link>
                    }
                  />
                </ListItem>
              )
            })}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  )
}
