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
        <Typography variant="overline">Creators</Typography>
        <QuickForm effects={[({ creators }) => update({ creators })]} creators={[]}>
          {(update, { creators }) => {
            return (
              <>
                {creators.map((fields, i) => {
                  const { name, affiliation: affiliations } = fields
                  return (
                    <Fade key={i} in={true}>
                      <Card
                        variant="outlined"
                        style={{ marginBottom: theme.spacing(1), width: '100%' }}
                      >
                        <CardContent>
                          <TextField
                            fullWidth
                            variant="standard"
                            margin="dense"
                            helperText="Provide a name for this creator"
                            label="Name"
                            value={name}
                            onChange={({ target: { value: name } }) =>
                              update({
                                creators: creators.map((creator, j) =>
                                  i === j ? { ...fields, name } : creator
                                ),
                              })
                            }
                          />
                          {affiliations.map(({ affiliation }, j) => (
                            <Fade key={j} in={true}>
                              <TextField
                                fullWidth
                                variant="standard"
                                margin="dense"
                                helperText="Creator's affiliation"
                                label={`Affiliation ${j + 1}`}
                                value={affiliation}
                                onChange={({ target: { value } }) =>
                                  update({
                                    creators: creators.map((creator, k) =>
                                      i === k
                                        ? {
                                            ...fields,
                                            affiliation: affiliations.map((affiliation_, l) =>
                                              j === l ? { affiliation: value } : affiliation_
                                            ),
                                          }
                                        : creator
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
                                  creators: creators.map((creator, k) =>
                                    i === k
                                      ? { ...fields, affiliation: affiliations.slice(0, -1) }
                                      : creator
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
                                  creators: creators.map((creator, k) =>
                                    i === k
                                      ? {
                                          ...fields,
                                          affiliation: [...affiliations, { affiliation: '' }],
                                        }
                                      : creator
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
                    disabled={creators.length < 1}
                    size="small"
                    color="primary"
                    onClick={() => update({ creators: creators.slice(0, -1) })}
                  >
                    <RemoveCreatorIcon />
                  </IconButton>

                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() =>
                      update({
                        creators: [...creators, { name: '', affiliation: [{ affiliation: '' }] }],
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
