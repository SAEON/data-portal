import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import useTheme from '@material-ui/core/styles/useTheme'
import Search from '../../../components/search'
import useStyles from './style'
import { isMobile } from 'react-device-detect'
import { CATALOGUE_CLIENT_ADDRESS } from '../../../config'

export default ({ children }) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
      }}
    >
      <Toolbar style={{ padding: 8, width: '100%' }} className={classes.toolbar}>
        <Grid container spacing={0} justify="center">
          <Grid container item xs={12} sm={8} direction={isMobile ? 'column' : 'row'}>
            <Grid style={{ display: 'flex' }} item>
              <a style={{ display: 'block', margin: 'auto' }} href={CATALOGUE_CLIENT_ADDRESS}>
                <img
                  height={80}
                  style={{
                    display: isMobile ? 'none' : 'inherit',
                  }}
                  src="/saeon-logo-white.png"
                  alt="Logo"
                />
              </a>
            </Grid>
            <Grid style={{ display: 'flex' }} item>
              {isMobile ? undefined : (
                <Divider className={classes.divider} variant="middle" orientation="vertical" />
              )}
            </Grid>
            <Grid item style={{ flexGrow: 2 }}>
              <Search
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
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <div style={{ display: 'block', width: '100%' }}>{children}</div>
      </div>
    </div>
  )
}
