import React from 'react'
import { Grid, TextField, Fade, useMediaQuery, InputAdornment, IconButton } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import { useTheme } from '@material-ui/core/styles'
import useStyles from './style'
import clsx from 'clsx'

export default () => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Fade in={true}>
      <Grid
        container
        spacing={2}
        style={{ position: 'absolute', top: 'calc(50% - 120px)', zIndex: 1 }}
        alignItems="stretch"
        item
        className={clsx({
          [classes.mobile]: !matches,
          [classes.notMobile]: matches,
        })}
        xs={12}
        md={6}
      >
        {/* Header */}
        <Grid item xs={12}>
          <TextField
            style={{ padding: 0 }}
            size="medium"
            margin="normal"
            className={classes.textField}
            fullWidth
            placeholder="Enter search terms"
            id="saeon-data-search"
            variant="outlined"
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment style={{ padding: 0 }} position="end">
                  <IconButton aria-label="Search" size="medium">
                    <SearchIcon style={{ color: 'white' }} fontSize="large" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Fade>
  )
}
