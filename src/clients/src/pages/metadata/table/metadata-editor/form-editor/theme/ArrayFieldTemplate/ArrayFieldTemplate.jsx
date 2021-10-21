import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import { alpha } from '@mui/material/styles'
import AddButton from '../AddButton/AddButton'
import IconButton from '../IconButton/IconButton'
import { utils } from '@rjsf/core'

const { isMultiSelect, getDefaultRegistry } = utils

const ArrayFieldTemplate = props => {
  const { schema, registry = getDefaultRegistry() } = props

  if (isMultiSelect(schema, registry['rootSchema'])) {
    return <DefaultFixedArrayFieldTemplate {...props} />
  } else {
    return <DefaultNormalArrayFieldTemplate {...props} />
  }
}

const ArrayFieldTitle = ({ TitleField, idSchema, title, required }) => {
  if (!title) {
    return null
  }

  const id = `${idSchema.$id}__title`
  return <TitleField id={id} title={title} required={required} />
}

const ArrayFieldDescription = ({ DescriptionField, idSchema, description }) => {
  if (!description) {
    return null
  }

  const id = `${idSchema.$id}__description`
  return <DescriptionField id={id} description={description} />
}

// Used in the two templates
const DefaultArrayItem = props => {
  return (
    <Grid container style={{ padding: 0 }} alignItems="center">
      <Grid item xs style={{ overflow: 'auto' }}>
        <Box paddingLeft={2} paddingBottom={2}>
          {props.children}
        </Box>
      </Grid>

      {props.hasToolbar && (
        <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
          <IconButton
            icon="arrow-up"
            className="array-item-move-up"
            tabIndex={-1}
            iconProps={{ fontSize: 'small' }}
            disabled={props.disabled || props.readonly || !props.hasMoveUp}
            onClick={props.onReorderClick(props.index, props.index - 1)}
          />

          <IconButton
            icon="arrow-down"
            tabIndex={-1}
            iconProps={{ fontSize: 'small' }}
            disabled={props.disabled || props.readonly || !props.hasMoveDown}
            onClick={props.onReorderClick(props.index, props.index + 1)}
          />

          {props.hasRemove && (
            <IconButton
              icon="remove"
              tabIndex={-1}
              iconProps={{ fontSize: 'small' }}
              disabled={props.disabled || props.readonly}
              onClick={props.onDropIndexClick(props.index)}
            />
          )}
        </Grid>
      )}
    </Grid>
  )
}

const DefaultFixedArrayFieldTemplate = props => {
  return (
    <fieldset className={props.className}>
      <ArrayFieldTitle
        key={`array-field-title-${props.idSchema.$id}`}
        TitleField={props.TitleField}
        idSchema={props.idSchema}
        title={props.uiSchema['ui:title'] || props.title}
        required={props.required}
      />

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
  )
}

const DefaultNormalArrayFieldTemplate = props => {
  const theme = useTheme()

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.spacing(4),
      }}
    >
      <Typography variant="overline">{props.uiSchema['ui:title'] || props.title}</Typography>

      <Card
        variant="outlined"
        style={{ width: '100%', backgroundColor: alpha(theme.palette.primary.dark, 0.03) }}
      >
        <CardContent style={{ padding: 0 }}>
          {(props.uiSchema['ui:description'] || props.schema.description) && (
            <Box px={2} py={1}>
              <ArrayFieldDescription
                key={`array-field-description-${props.idSchema.$id}`}
                DescriptionField={props.DescriptionField}
                idSchema={props.idSchema}
                description={props.uiSchema['ui:description'] || props.schema.description}
              />
            </Box>
          )}
          <Grid container={true} key={`array-item-list-${props.idSchema.$id}`}>
            {props.items &&
              props.items.map((p, i) => {
                return (
                  <Fade key={p.key} in={true}>
                    <span style={{ width: '100%' }}>
                      {i > 0 && (
                        <Divider
                          style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }}
                          variant="fullWidth"
                          flexItem
                          orientation="horizontal"
                        />
                      )}
                      <DefaultArrayItem {...p} />
                    </span>
                  </Fade>
                )
              })}
          </Grid>
        </CardContent>
      </Card>

      {props.canAdd && (
        <Grid container justifyItems="flex-end">
          <Grid item={true} xs={12} style={{ display: 'grid', justifyContent: 'flex-end' }}>
            <Box mt={2}>
              <AddButton
                className="array-item-add"
                onClick={props.onAddClick}
                disabled={props.disabled || props.readonly}
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default ArrayFieldTemplate
