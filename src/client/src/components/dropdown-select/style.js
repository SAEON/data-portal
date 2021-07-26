import makeStyles from '@material-ui/core/styles/makeStyles'

export default makeStyles(theme => {
  console.log('theme.palette', theme.palette)
  return {
    list: {
      width: '100%',
      listStyle: 'none',
      padding: 'unset',
    },
    listItem: {
      backgroundColor: theme.palette.grey[100], //add to /take from theme
      '&:hover': {
        backgroundColor: theme.palette.grey[300],
        transition: 'background-color 100ms linear',
      },
      height: '40px', //needed
      lineHeight: '40px', //needed
      margin: '4px', //needed
    },
    //needed
    gridText: {
      paddingLeft: '10px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      // might need to set font. to be tested
    },
    listItemClose: {
      marginLeft: 'auto',
      marginRight: theme.spacing(1),
      '&:hover': {
        cursor: 'pointer',
      },
    },
  }
})
