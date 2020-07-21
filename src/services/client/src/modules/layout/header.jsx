import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Menu,
  Fade,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  CircularProgress,
  Tooltip,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import {
  Explore as MapIcon,
  Menu as MenuIcon,
  GitHub as GitHubIcon,
  Storage as StorageIcon,
  Info as InfoIcon,
  Home as HomeIcon,
  AccountCircle as AccountIcon,
  Feedback as FeedbackIcon,
  Done as DoneIcon,
  Error as ErrorIcon,
} from '@material-ui/icons'
import NavItem from './nav-item'
import packageJson from '../../../package.json'
import { SOURCE_CODE_URI } from '../../config'
import useStyles from './style'
import { AuthContext } from '../provider-auth'
import QuickForm from '@saeon/quick-form'
import { gql, useMutation } from '@apollo/client'

export default withRouter(() => {
  const classes = useStyles()
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [userMenuAnchor, setUserMenuAnchor] = useState(null)
  const [feedbackDialogueOpen, setFeedbackDialogueOpen] = useState(false)
  const closeMenu = () => setMenuAnchor(null)

  return (
    <AppBar variant="outlined" position="static">
      <Toolbar disableGutters={false} variant="dense">
        <IconButton
          onClick={e => setMenuAnchor(e.currentTarget)}
          style={{ padding: 0 }}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={menuAnchor}
          keepMounted
          open={Boolean(menuAnchor)}
          onClose={closeMenu}
          onClick={closeMenu}
        >
          {/* Home page */}
          <NavItem label={'Home'} icon={<HomeIcon />} to="/" />

          {/* Catalogue page */}
          <NavItem label={'Catalogue'} icon={<StorageIcon />} to="/catalogue" />

          {/* Atlas page */}
          <NavItem label={'Atlas'} icon={<MapIcon />} to="/atlas" />

          {/* About page */}
          <NavItem label={'About'} icon={<InfoIcon />} to="/about" />

          {/* Source code link */}
          <NavItem label={'Source Code'} icon={<GitHubIcon />} href={SOURCE_CODE_URI} />
        </Menu>

        {/* Title */}
        <Typography style={{ padding: '10px' }} display="block" variant="body2">
          SAEON DATA PORTAL v{packageJson.version}
        </Typography>

        {/* User account */}
        <AuthContext.Consumer>
          {({ loggedIn, login, logout }) => (
            <div style={{ marginLeft: 'auto' }}>
              {/* FEEDBACK BUTTON */}
              <IconButton
                style={{ marginRight: 10 }}
                aria-label="Provide anonymous feedback"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => setFeedbackDialogueOpen(!feedbackDialogueOpen)}
                color="inherit"
                size="small"
              >
                <FeedbackIcon />
              </IconButton>

              {/* FEEDBACK DIALOGUE */}
              <Dialog
                open={feedbackDialogueOpen}
                onClose={() => setFeedbackDialogueOpen(false)}
                aria-labelledby="Feedback Dialogue"
                aria-describedby="Provide anonymous feedback"
              >
                <QuickForm text="" rating={0}>
                  {({ updateForm, text, rating }) => {
                    const [submitFeedback, { error, loading, data }] = useMutation(gql`
                      mutation submitFeedback($text: String!, $rating: Int!) {
                        submitFeedback(text: $text, rating: $rating)
                      }
                    `)
                    return (
                      <>
                        <DialogTitle>Feedback</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Feedback collected here is anonymous - we appreciate your effort in
                            helping us build a service that better works and better suits your need
                          </DialogContentText>
                          <Rating
                            size="small"
                            max={5}
                            name="simple-controlled"
                            value={parseInt(rating, 10)}
                            onChange={({ target }) => {
                              updateForm({ rating: parseInt(target.value, 10) })
                            }}
                          />
                          <TextField
                            error={text.length >= 10 ? false : true}
                            helperText={
                              text.length >= 10
                                ? ''
                                : `${10 - text.length} more characters required...`
                            }
                            autoFocus
                            margin="dense"
                            multiline
                            rows={4}
                            value={text}
                            onChange={({ target }) => updateForm({ text: target.value })}
                            rowsMax={10}
                            variant="outlined"
                            fullWidth
                          />
                        </DialogContent>
                        <DialogActions>
                          {loading ? (
                            <CircularProgress />
                          ) : data ? (
                            <DoneIcon color="secondary" />
                          ) : error ? (
                            <Tooltip title={error.message}>
                              <ErrorIcon color="error" />
                            </Tooltip>
                          ) : undefined}

                          {data || error ? (
                            <Button
                              disabled={false}
                              color="primary"
                              onClick={() => {
                                setFeedbackDialogueOpen(false)
                              }}
                              autoFocus
                            >
                              Close
                            </Button>
                          ) : (
                            <Button
                              disabled={loading || text.length >= 10 ? false : true}
                              color="primary"
                              onClick={() => {
                                submitFeedback({ variables: { text, rating } })
                              }}
                              autoFocus
                            >
                              Send
                            </Button>
                          )}
                        </DialogActions>
                      </>
                    )
                  }}
                </QuickForm>
              </Dialog>

              {/* USER MENU BUTTON */}
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={({ currentTarget }) => setUserMenuAnchor(currentTarget)}
                color="inherit"
                size="small"
              >
                <AccountIcon color={loggedIn ? 'secondary' : 'inherit'} />
              </IconButton>

              {/* USER MENU */}
              <Menu
                id="menu-appbar"
                anchorEl={userMenuAnchor}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(userMenuAnchor)}
                onClose={() => setUserMenuAnchor(null)}
                TransitionComponent={Fade}
              >
                {/* Login */}
                {loggedIn ? null : (
                  <MenuItem
                    color="inherit"
                    className={classes.link}
                    onClick={() => {
                      login()
                      setUserMenuAnchor(null)
                    }}
                    dense={true}
                  >
                    <Typography variant="overline">Login</Typography>
                  </MenuItem>
                )}

                {/* Signup */}
                {loggedIn ? null : (
                  <MenuItem
                    color="inherit"
                    className={classes.link}
                    onClick={() => {
                      login()
                      setUserMenuAnchor(null)
                    }}
                    dense={true}
                  >
                    <Typography variant="overline">Signup</Typography>
                  </MenuItem>
                )}

                {/* Logout */}
                {loggedIn ? (
                  <MenuItem
                    className={classes.link}
                    to="/logout"
                    color="inherit"
                    component={NavLink}
                    dense={true}
                    onClick={() => {
                      logout()
                      setUserMenuAnchor(null)
                    }}
                  >
                    <Typography variant="overline">Logout</Typography>
                  </MenuItem>
                ) : null}
              </Menu>
            </div>
          )}
        </AuthContext.Consumer>
      </Toolbar>
    </AppBar>
  )
})
