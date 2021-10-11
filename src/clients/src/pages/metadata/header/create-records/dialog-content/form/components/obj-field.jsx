import { memo } from 'react'
import useTheme from '@material-ui/core/styles/useTheme'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import TextField from '@material-ui/core/TextField'
import RemoveIcon from 'mdi-react/RemoveCircleIcon'
import QuickForm from '@saeon/quick-form'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Fade from '@material-ui/core/Fade'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import AddIcon from 'mdi-react/AddCircleIcon'

const TextField_ = ({ update, value, label, helperText }) => {
  return (
    <TextField
      fullWidth
      variant="standard"
      margin="dense"
      helperText={helperText}
      label={label}
      value={value}
      onChange={update}
    />
  )
}

const Select = ({ update, value, label, helperText, options }) => (
  <TextField
    fullWidth
    select
    variant="standard"
    margin="dense"
    helperText={helperText}
    label={label}
    value={value}
    onChange={update}
  >
    {options.map(val => (
      <MenuItem key={val} value={val}>
        {val}
      </MenuItem>
    ))}
  </TextField>
)

export default memo(
  ({ update, namespace, formFields }) => {
    const theme = useTheme()

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: theme.spacing(4),
        }}
      >
        <Typography variant="overline">{namespace.toUpperCase()}</Typography>
        <QuickForm effects={[fields => update({ ...fields })]}>
          {(update, fields) => {
            const formValues = fields?.[namespace] || []

            return (
              <>
                {formValues.map((values, i) => {
                  return (
                    <Fade key={i} in={true}>
                      <Card
                        variant="outlined"
                        style={{ marginBottom: theme.spacing(1), width: '100%' }}
                      >
                        <CardContent>
                          {formFields.map(formField => {
                            const doUpdate = ({ target: { value } }) =>
                              update({
                                [namespace]: formValues.map((val, j) =>
                                  i === j ? { ...values, [formField.name]: value } : val
                                ),
                              })

                            // SUB-FORM
                            if (formField.formFields) {
                              const formFields_ = values[formField.name]
                              return (
                                <span key={formField.name}>
                                  {formFields_.map((formField_, j) => (
                                    <Fade key={j} in={true}>
                                      <TextField
                                        fullWidth
                                        variant="standard"
                                        margin="dense"
                                        helperText={formField.name.capitalize()}
                                        label={`${formField.name.capitalize()} ${j + 1}`}
                                        value={formField_.name}
                                        onChange={({ target: { value } }) =>
                                          update({
                                            [namespace]: formValues.map((val, k) =>
                                              i === k
                                                ? {
                                                    ...values,
                                                    [namespace]: formFields_.map((val, l) =>
                                                      j === l ? { [formField_.name]: value } : val
                                                    ),
                                                  }
                                                : val
                                            ),
                                          })
                                        }
                                      />
                                    </Fade>
                                  ))}

                                  {/* ADD / REMOVE */}
                                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Tooltip title={`Remove ${formField.name}}`}>
                                      <span>
                                        <IconButton
                                          disabled={formFields_.length <= 0}
                                          size="small"
                                          color="primary"
                                          onClick={() =>
                                            update({
                                              [namespace]: formValues.map((value, k) =>
                                                i === k
                                                  ? {
                                                      ...values,
                                                      [formField.name]: formFields_.slice(0, -1),
                                                    }
                                                  : value
                                              ),
                                            })
                                          }
                                        >
                                          <RemoveIcon size={18} />
                                        </IconButton>
                                      </span>
                                    </Tooltip>
                                    <Tooltip title={`Add ${formField.name}`}>
                                      <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() =>
                                          update({
                                            [namespace]: formValues.map((value, k) =>
                                              i === k
                                                ? {
                                                    ...values,
                                                    [formField.name]: [
                                                      ...formFields_,
                                                      { [formField.name]: '' },
                                                    ],
                                                  }
                                                : value
                                            ),
                                          })
                                        }
                                      >
                                        <AddIcon size={18} />
                                      </IconButton>
                                    </Tooltip>
                                  </div>
                                </span>
                              )
                            }

                            // TEXT FIELD
                            if (formField.type === 'text') {
                              return (
                                <TextField_
                                  key={formField.name}
                                  label={formField.label}
                                  value={values[formField.name]}
                                  helperText={formField.helperText}
                                  update={doUpdate}
                                />
                              )
                            }

                            // SELECT FIELD
                            if (formField.type === 'select') {
                              return (
                                <Select
                                  key={formField.name}
                                  value={values[formField.name]}
                                  label={formField.label}
                                  helperText={formField.helperText}
                                  options={formField.options}
                                  update={doUpdate}
                                />
                              )
                            }
                            return null
                          })}
                        </CardContent>
                      </Card>
                    </Fade>
                  )
                })}

                {/* ADD / REMOVE */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto' }}>
                  <Tooltip title={`Remove from ${namespace}`}>
                    <span>
                      <IconButton
                        disabled={formValues.length < 1}
                        size="small"
                        color="primary"
                        onClick={() => update({ [namespace]: formValues.slice(0, -1) })}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title={`Add to ${namespace}`}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() =>
                        update({
                          [namespace]: [
                            ...formValues,
                            Object.fromEntries(
                              formFields.map(({ name, defaultValue }) => {
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
  },
  () => true
)
