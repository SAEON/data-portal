import { Divider, Grid, Toolbar } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import RecordsSearch from '../../../components/records-search'
import useStyles from './style'
import { isMobile } from 'react-device-detect'
import { CATALOGUE_CLIENT_ADDRESS } from '../../../config'

export default () => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div style={{ position: 'relative' }}>
      <Toolbar style={{ padding: 8 }} className={classes.toolbar}>
        <Grid container spacing={0} justify="center">
          <Grid container item xs={12} sm={8} direction={isMobile ? 'column' : 'row'}>
            <Grid style={{ display: 'flex' }} item>
              <a style={{ display: 'block', margin: 'auto' }} href={CATALOGUE_CLIENT_ADDRESS}>
                <img
                  style={{
                    height: 80,
                    display: isMobile ? 'none' : 'inherit',
                  }}
                  src="/saeon-logo-white.png"
                />
              </a>
            </Grid>
            <Grid style={{ display: 'flex' }} item>
              {isMobile ? undefined : (
                <Divider className={classes.divider} variant="middle" orientation="vertical" />
              )}
            </Grid>
            <Grid item style={{ flexGrow: 2 }}>
              <RecordsSearch
                className={classes.recordsSearchBox}
                color={'secondary'}
                inputProps={{
                  className: classes.input,
                }}
                iconProps={{ style: { color: theme.palette.common.white } }}
                autofocus={true}
              />
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  )
}
