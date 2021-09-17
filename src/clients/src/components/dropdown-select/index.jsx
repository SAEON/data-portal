import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import CloseIcon from 'mdi-react/CloseIcon'
import AutoComplete from '../autocomplete'
import useStyles from './style.js'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
/**
 * TO-DO:
 * Ellipsis overflow needs work
 * textfield/icon grid layout sizing values can be cleaned up
 * general padding can be cleaned up
 */
export default ({ options, selectedOptions, setOption, label, Icon }) => {
  const classes = useStyles()
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
        <ul className={clsx(classes.list)}>
          {selectedOptions?.map((value, i) => {
            return (
              <li key={i} className={clsx(classes.listItem)}>
                <Grid container>
                  <Grid item xs={12} sm={11} className={clsx(classes.gridText)}>
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
                      className={clsx(classes.listItemClose)}
                    >
                      <CloseIcon size={20} />
                    </IconButton>
                  </Grid>
                </Grid>
              </li>
            )
          })}
        </ul>
      </Grid>
    </Grid>
  )
}
