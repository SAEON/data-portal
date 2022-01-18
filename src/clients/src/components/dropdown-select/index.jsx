import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import CloseIcon from 'mdi-react/CloseIcon'
import AutoComplete from '../../components/autocomplete'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const ListItem = styled('li')(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  '&:hover': {
    backgroundColor: theme.palette.grey[300],
    transition: theme.transitions.create(['background-color']),
  },
  height: '40px',
  lineHeight: '40px',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}))

export default ({ options, selectedOptions, setOption, label, Icon }) => {
  return (
    <Grid container>
      {/* TextField */}
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-end">
          {Icon && (
            <Grid item>
              <Icon />
            </Grid>
          )}
          <Grid item xs={12} sm={Icon ? 11 : 12}>
            <AutoComplete
              multiple
              options={options}
              selectedOptions={selectedOptions}
              setOption={setOption}
              label={<Typography>{label}</Typography>}
              renderTags={() => {}} //rendering no tags
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Selected Items List */}
      <Grid item xs={12}>
        <ul style={{ width: '100%', listStyle: 'none', padding: 'unset' }}>
          {selectedOptions?.map((value, i) => {
            return (
              <ListItem key={i}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sm={11}
                    sx={{
                      paddingLeft: '10px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                  >
                    {value}
                  </Grid>
                  <Grid item xs={12} sm={1} style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      size="small"
                      onClick={() => {
                        let updatedOptions = [...selectedOptions]
                        updatedOptions.splice(i, 1)
                        setOption(updatedOptions)
                      }}
                      sx={{
                        marginLeft: 'auto',
                        marginRight: theme => theme.spacing(1),
                        '&:hover': {
                          cursor: 'pointer',
                        },
                      }}
                    >
                      <CloseIcon size={20} />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItem>
            )
          })}
        </ul>
      </Grid>
    </Grid>
  )
}
