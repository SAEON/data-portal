import { makeStyles, fade } from '@material-ui/core/styles'

export default makeStyles(theme => {
  console.log('theme.palette', theme.palette)
  return {
    autoComplete: {
      '& .MuiChip-root': {
        display: 'none',
      },
    },

    list: {
      backgroundColor: theme.palette.common.white,
      listStyle: 'none',
      paddingLeft: '10px',
      paddingRight: '10px',
    },
    listItem: {
      backgroundColor: '#f5f5f5',
      '&:hover': {
        backgroundColor: theme.palette.grey[300],
        // -webkit-transition: background-color 1000ms linear
        // -ms-transition: background-color 1000ms linear
        transition: 'background-color 100ms linear',
      },
      height: '40px',
      lineHeight: '40px',
      margin: '4px',
      verticalAlign: 'middle',
      paddingLeft: '20px',
      paddingRight: '20px',
    },
    listItemText: {
      display: 'inline-block',
      verticalAlign: 'middle',
      lineHeight: 'normal',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      maxWidth: 300, //temporary solution till ellipsis work
    },
    listItemClose: {
      float: 'right',
    },
  }
})
