import useTheme from '@mui/material/styles/useTheme'
import Grid from '@mui/material/Grid'
import { utils } from '@rjsf/core'
import AddButton from '../AddButton/AddButton'

const { canExpand } = utils

const ObjectFieldTemplate = ({
  DescriptionField,
  description,
  TitleField,
  title,
  properties,
  required,
  disabled,
  readonly,
  uiSchema,
  idSchema,
  schema,
  formData,
  onAddClick,
}) => {
  const theme = useTheme()

  return (
    <>
      {(uiSchema['ui:title'] || title) && (
        <>
          <div style={{ marginTop: theme.spacing(4) }} />
          <TitleField id={`${idSchema.$id}-title`} title={title} required={required} />
        </>
      )}
      {description && (
        <>
          <DescriptionField id={`${idSchema.$id}-description`} description={description} />
          <div style={{ marginTop: theme.spacing(2) }} />
        </>
      )}
      <Grid container={true} spacing={2} style={{ marginTop: theme.spacing(1) }}>
        {properties.map((element, index) =>
          // Remove the <Grid> if the inner element is hidden as the <Grid>
          // itself would otherwise still take up space.
          element.hidden ? (
            element.content
          ) : (
            <Grid item={true} xs={12} key={index}>
              {element.content}
            </Grid>
          )
        )}
        {canExpand(schema, uiSchema, formData) && (
          <Grid container justifyContent="flex-end">
            <Grid item>
              <AddButton
                className="object-property-expand"
                onClick={onAddClick(schema)}
                disabled={disabled || readonly}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default ObjectFieldTemplate
