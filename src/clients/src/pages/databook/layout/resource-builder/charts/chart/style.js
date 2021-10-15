import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => {
  console.log('theme.palette', theme.palette)
  return {
    toolbar: {
      backgroundColor: theme.palette.grey[100],
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    dialogTitle: {
      cursor: 'move',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      textAlign: 'center',
    },
    dialogContent: {
      padding: '0px',
    },
    dialogActions: {
      position: 'absolute',
      right: '0px',
      bottom: '10px',
    },
    playButton: {
      position: 'absolute',
      zIndex: 5,
      right: '5px',
      top: '5px',
      color: 'orange',
    },
    cancelButton: {
      color: theme.palette.grey['A700'],
    },
    saveButton: { color: theme.palette.primary.light },
  }
})
