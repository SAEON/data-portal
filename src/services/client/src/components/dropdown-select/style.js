import makeStyles from '@material-ui/core/styles/makeStyles'

export default makeStyles(theme => {
  console.log('theme.palette', theme.palette)
  return {
    list: {
      listStyle: 'none', //needed
      padding: 'unset', //needed
    },
    listItem: {
      backgroundColor: '#f5f5f5', //add to /take from theme
      '&:hover': {
        backgroundColor: theme.palette.grey[300],
        // -webkit-transition: background-color 1000ms linear
        // -ms-transition: background-color 1000ms linear
        transition: 'background-color 100ms linear', //needed
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
    //needed
    listItemClose: {
      float: 'right',
    },
  }
})
