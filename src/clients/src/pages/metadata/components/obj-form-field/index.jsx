import { useRef, useEffect, memo } from 'react'
import useTheme from '@material-ui/core/styles/useTheme'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import RemoveIcon from 'mdi-react/RemoveCircleIcon'
import QuickForm from '@saeon/quick-form'
import IconButton from '@material-ui/core/IconButton'
import Fade from '@material-ui/core/Fade'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import AddIcon from 'mdi-react/AddCircleIcon'
import SelectField from './_select-field'
import TextField from './_text-field'
import debounce from '../../../../lib/fns/debounce'

export default memo(({ update, root, fields }) => {
  const theme = useTheme()

  const _update = useRef(null)

  useEffect(() => {
    _update.current = update
  })

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.spacing(4),
      }}
    >
      <Typography variant="overline">{root.toUpperCase()}</Typography>
      <QuickForm effects={[debounce(obj => _update.current?.({ ...obj }), 250)]}>
        {(update, values) => {
          const fieldValues = values?.[root] || []

          /**
           * Clicking the add button creates default values
           * for a field. As such, render the field values
           * rather than the field definition
           */
          return (
            <>
              {fieldValues.map((fieldValue, i) => {
                return (
                  <Fade key={`${root}-${i}`} in={true}>
                    <Card
                      variant="outlined"
                      style={{ marginBottom: theme.spacing(1), width: '100%' }}
                    >
                      <CardContent>
                        {fields.map(field => {
                          const update_ = ({ target: { value: newValue } }) =>
                            update({
                              [root]: fieldValues.map((val, j) =>
                                i === j ? { ...fieldValue, [field.name]: newValue } : val
                              ),
                            })

                          // TEXT FIELD
                          if (field.type === 'text') {
                            return (
                              <TextField
                                key={field.name}
                                label={field.label}
                                helperText={
                                  typeof field.helperText === 'function'
                                    ? field.helperText({ i })
                                    : field.helperText
                                }
                                value={fieldValue[field.name]}
                                onChange={update_}
                              />
                            )
                          }

                          // SELECT FIELD
                          if (field.type === 'select') {
                            return (
                              <SelectField
                                key={field.name}
                                value={fieldValue[field.name]}
                                label={field.label}
                                helperText={
                                  typeof field.helperText === 'function'
                                    ? field.helperText({ i })
                                    : field.helperText
                                }
                                options={field.options}
                                onChange={update_}
                              />
                            )
                          }

                          // ARRAY OF OBJECTS
                          if (field.type === 'arrayOfObjects') {
                            const field_ = field.objectFields
                            const array = values[root]
                            const objects = array[i][field_.name]

                            return (
                              <span key={field_.name}>
                                {/* FORM FIELDS */}
                                {objects.map((object, j) => (
                                  <Fade key={`${root}-${field_.name}-${j}`} in={true}>
                                    <span>
                                      <TextField
                                        helperText={
                                          typeof field_.helperText === 'function'
                                            ? field_.helperText({ i: j })
                                            : field_.helperText
                                        }
                                        label={field_.label}
                                        value={object[field_.name]}
                                        onChange={({ target: { value } }) => {
                                          update({
                                            [root]: array.map((object, k) =>
                                              i === k
                                                ? {
                                                    ...object,
                                                    [field_.name]: object[field_.name].map(
                                                      (object_, l) =>
                                                        j === l
                                                          ? {
                                                              ...object_,
                                                              [field_.name]: value,
                                                            }
                                                          : object_
                                                    ),
                                                  }
                                                : object
                                            ),
                                          })
                                        }}
                                      />
                                    </span>
                                  </Fade>
                                ))}
                                {/* ADD / REMOVE */}
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                  <Tooltip title={`Remove ${field.name}}`}>
                                    <span>
                                      <IconButton
                                        disabled={array.length <= 0}
                                        size="small"
                                        color="primary"
                                        onClick={() =>
                                          update({
                                            [root]: array.map((object, j) =>
                                              i === j
                                                ? {
                                                    ...object,
                                                    [field_.name]: object[field_.name].slice(0, -1),
                                                  }
                                                : object
                                            ),
                                          })
                                        }
                                      >
                                        <RemoveIcon size={18} />
                                      </IconButton>
                                    </span>
                                  </Tooltip>
                                  <Tooltip title={`Add ${field.name}`}>
                                    <span>
                                      <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() =>
                                          update({
                                            [root]: array.map((object, j) => {
                                              return i === j
                                                ? {
                                                    ...object,
                                                    [field_.name]: [
                                                      ...object[field_.name],
                                                      field_.defaultValue,
                                                    ],
                                                  }
                                                : object
                                            }),
                                          })
                                        }
                                      >
                                        <AddIcon size={18} />
                                      </IconButton>
                                    </span>
                                  </Tooltip>
                                </div>
                              </span>
                            )
                          }

                          throw new Error('Unknown field type in form builder')
                        })}
                      </CardContent>
                    </Card>
                  </Fade>
                )
              })}

              {/* ADD / REMOVE */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto' }}>
                <Tooltip title={`Remove from ${root}`}>
                  <span>
                    <IconButton
                      disabled={fieldValues.length < 1}
                      size="small"
                      color="primary"
                      onClick={() => update({ [root]: fieldValues.slice(0, -1) })}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title={`Add to ${root}`}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() =>
                      update({
                        [root]: [
                          ...fieldValues,
                          Object.fromEntries(
                            fields.map(({ name, defaultValue }) => {
                              return [name, defaultValue]
                            })
                          ),
                        ],
                      })
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </>
          )
        }}
      </QuickForm>
    </div>
  )
})
