import { memo } from 'react'
import QuickForm from '@saeon/quick-form'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import AddCreatorIcon from 'mdi-react/AddCircleIcon'
import RemoveCreatorIcon from 'mdi-react/RemoveCircleIcon'
import useTheme from '@material-ui/core/styles/useTheme'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Fade from '@material-ui/core/Fade'
import MenuItem from '@material-ui/core/MenuItem'

const contributorTypeOptions = ['projectManager', 'HostingInstitution']

export default memo(
  ({ update }) => {
    const theme = useTheme()

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: theme.spacing(4),
        }}
      >
        <Typography variant="overline">Contributors</Typography>
        <QuickForm effects={[({ contributors }) => update({ contributors })]} contributors={[]}>
          {(update, { contributors }) => {
            return (
              <>
                {contributors.map((fields, i) => {
                  const { name, affiliation: affiliations, contributorType } = fields
                  return (
                    <Fade key={i} in={true}>
                      <Card
                        variant="outlined"
                        style={{ marginBottom: theme.spacing(1), width: '100%' }}
                      >
                        <CardContent>
                          {/* NAME */}
                          <TextField
                            fullWidth
                            variant="standard"
                            margin="dense"
                            helperText="Provide a name for this contributor"
                            label="Name"
                            value={name}
                            onChange={({ target: { value: name } }) =>
                              update({
                                contributors: contributors.map((contributor, j) =>
                                  i === j ? { ...fields, name } : contributor
                                ),
                              })
                            }
                          />

                          {/* CONTRIBUTOR TYPE */}
                          <TextField
                            fullWidth
                            select
                            variant="standard"
                            margin="dense"
                            helperText="What type of contribution did this this person make?"
                            label="Contributor type"
                            value={contributorType}
                            onChange={({ target: { value: contributorType } }) =>
                              update({
                                contributors: contributors.map((contributor, j) =>
                                  i === j ? { ...fields, contributorType } : contributor
                                ),
                              })
                            }
                          >
                            {contributorTypeOptions.map(val => (
                              <MenuItem key={val} value={val}>
                                {val}
                              </MenuItem>
                            ))}
                          </TextField>

                          {/* AFFILIATION */}
                          {affiliations.map(({ affiliation }, j) => (
                            <Fade key={j} in={true}>
                              <TextField
                                fullWidth
                                variant="standard"
                                margin="dense"
                                helperText="Contributor's affiliation"
                                label={`Affiliation ${j + 1}`}
                                value={affiliation}
                                onChange={({ target: { value } }) =>
                                  update({
                                    contributors: contributors.map((contributor, k) =>
                                      i === k
                                        ? {
                                            ...fields,
                                            affiliation: affiliations.map((affiliation_, l) =>
                                              j === l ? { affiliation: value } : affiliation_
                                            ),
                                          }
                                        : contributor
                                    ),
                                  })
                                }
                              />
                            </Fade>
                          ))}

                          {/* ADD / REMOVE AFFILIATIONS */}
                          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton
                              disabled={affiliations.length <= 1}
                              size="small"
                              color="primary"
                              onClick={() =>
                                update({
                                  contributors: contributors.map((contributor, k) =>
                                    i === k
                                      ? {
                                          ...fields,
                                          affiliation: affiliations.slice(0, -1),
                                        }
                                      : contributor
                                  ),
                                })
                              }
                            >
                              <RemoveCreatorIcon size={18} />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() =>
                                update({
                                  contributors: contributors.map((contributor, k) =>
                                    i === k
                                      ? {
                                          ...fields,
                                          affiliation: [...affiliations, { affiliation: '' }],
                                        }
                                      : contributor
                                  ),
                                })
                              }
                            >
                              <AddCreatorIcon size={18} />
                            </IconButton>
                          </div>
                        </CardContent>
                      </Card>
                    </Fade>
                  )
                })}

                {/* ADD / REMOVE CREATORS */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto' }}>
                  <IconButton
                    disabled={contributors.length < 1}
                    size="small"
                    color="primary"
                    onClick={() => update({ contributors: contributors.slice(0, -1) })}
                  >
                    <RemoveCreatorIcon />
                  </IconButton>

                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() =>
                      update({
                        contributors: [
                          ...contributors,
                          { name: '', affiliation: [{ affiliation: '' }], contributorType: '' },
                        ],
                      })
                    }
                  >
                    <AddCreatorIcon />
                  </IconButton>
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
