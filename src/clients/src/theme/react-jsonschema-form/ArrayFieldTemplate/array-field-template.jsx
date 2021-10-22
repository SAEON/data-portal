import { useState } from 'react'
import useTheme from '@mui/material/styles/useTheme'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import { alpha } from '@mui/material/styles'
import AddButton from '../AddButton/AddButton'
import ArrayFieldDescription from './array-field-template-description'
import DefaultArrayItem from './array-field-template-item'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import ExpandIcon from 'mdi-react/ExpandMoreIcon'
import CollapseIcon from 'mdi-react/ExpandLessIcon'

/**
 * NOTE sure what this is for
 * Probably delete in the future
 */
export const DefaultFixedArrayFieldTemplate = props => {
  const theme = useTheme()
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.spacing(4),
      }}
    >
      <fieldset className={props.className}>
        <Typography variant="overline">{props.uiSchema['ui:title'] || props.title}</Typography>

        {(props.uiSchema['ui:description'] || props.schema.description) && (
          <div className="field-description" key={`field-description-${props.idSchema.$id}`}>
            {props.uiSchema['ui:description'] || props.schema.description}
          </div>
        )}
        <div className="row array-item-list" key={`array-item-list-${props.idSchema.$id}`}>
          {props.items && props.items.map(DefaultArrayItem)}
        </div>
        {props.canAdd && (
          <AddButton
            className="array-item-add"
            onClick={props.onAddClick}
            disabled={props.disabled || props.readonly}
          />
        )}
      </fieldset>
    </div>
  )
}

export const DefaultNormalArrayFieldTemplate = props => {
  const [expanded, setExpanded] = useState(false)
  const theme = useTheme()

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
      }}
    >
      <span
        style={{
          flex: 1,
          display: 'flex',
          borderBottom: expanded ? 'none' : `1px solid ${theme.palette.grey[300]}`,
        }}
      >
        <Typography variant="overline">{props.uiSchema['ui:title'] || props.title}</Typography>
        <IconButton
          style={{ marginLeft: 'auto' }}
          onClick={() => setExpanded(expanded => !expanded)}
          size="small"
          color="primary"
        >
          {expanded ? <CollapseIcon size={18} /> : <ExpandIcon size={18} />}
        </IconButton>
      </span>
      <Collapse key={props.title} unmountOnExit in={expanded} style={{ width: '100%' }}>
        <span style={{ width: '100%' }}>
          <Card
            variant="outlined"
            style={{ width: '100%', backgroundColor: alpha(theme.palette.primary.dark, 0.03) }}
          >
            <CardContent style={{ padding: 0 }}>
              {(props.uiSchema['ui:description'] || props.schema.description) && (
                <Box px={2} py={1} style={{ textAlign: 'center' }}>
                  <ArrayFieldDescription
                    key={`array-field-description-${props.idSchema.$id}`}
                    DescriptionField={props.DescriptionField}
                    idSchema={props.idSchema}
                    description={props.uiSchema['ui:description'] || props.schema.description}
                  />
                </Box>
              )}
              <Grid container={true} key={`array-item-list-${props.idSchema.$id}`}>
                {props.items?.length ? (
                  props.items.map((p, i) => {
                    return (
                      <Fade key={p.key} in={true}>
                        <span style={{ width: '100%' }}>
                          {i > 0 && (
                            <Divider
                              style={{
                                marginTop: theme.spacing(4),
                                marginBottom: theme.spacing(4),
                              }}
                              variant="fullWidth"
                              flexItem
                              orientation="horizontal"
                            />
                          )}
                          <DefaultArrayItem {...p} />
                        </span>
                      </Fade>
                    )
                  })
                ) : (
                  <Typography
                    style={{ margin: theme.spacing(2), fontStyle: 'italic' }}
                    variant="body2"
                  >
                    None
                  </Typography>
                )}
              </Grid>
            </CardContent>
          </Card>

          {props.canAdd && (
            <Grid container justifyItems="flex-end">
              <Grid item={true} xs={12} style={{ display: 'grid', justifyContent: 'flex-end' }}>
                <Box mt={1}>
                  <AddButton
                    className="array-item-add"
                    onClick={props.onAddClick}
                    disabled={props.disabled || props.readonly}
                  />
                </Box>
              </Grid>
            </Grid>
          )}
        </span>
      </Collapse>
    </div>
  )
}
