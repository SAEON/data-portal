import { makeStyles, fade } from '@material-ui/core/styles'

export default makeStyles(theme => {
  return {
    layout: {
      backgroundColor: fade(theme.palette.common.white, 0.8),
      margin: theme.spacing(1),
      padding: '16px',
    },
    gridContainer: {},
    grid: {},
    gridItem: {},
    gridItemContent: {},
    item: {
      display: 'block',
      position: 'absolute',
      top: theme.spacing(1),
      bottom: theme.spacing(1),
      left: theme.spacing(1),
      right: theme.spacing(1),
      backgroundColor: fade(theme.palette.common.white, 0.8),
    },
    select: {
      color: 'white',
    },
    formControl: {
      margin: theme.spacing(1),
      width: '150px',
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      borderRadius: '6px',
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },
    icon: { color: 'white' },

    textField: {
      //spacing between filters
      margin: theme.spacing(1),
      //placeholder label
      '& .MuiInputLabel-root': {
        color: theme.palette.common.white,
      },
      //expansion arrow
      '& .MuiIconButton-label': {
        color: theme.palette.common.white,
      },
      //TextField border, and background color
      '& .MuiInputBase-root': {
        //parent
        width: '300px',
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.light,
        borderRadius: '5px',
        //attempting to make textbox scroll horizontally when full
        // overflowX: 'auto',
        // display: 'inline-block',
      },
      // '& .MuiChip-root': {
      //   //child
      //   // border:'1px solid red'
      // },
    },

    title: {
      lineHeight: 1.5,
      display: 'block',
      textAlign: 'center',
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
      color: theme.palette.text.primary,
    },
    subtitle: {
      paddingTop: 8,
      lineHeight: 1.5,
      display: 'block',
      textAlign: 'center',
    },
    description: {
      color: theme.palette.text.primary,
      fontSize: '0.8rem',
      lineHeight: 1.5,
      textAlign: 'center',
      whiteSpace: 'break-spaces',
      wordBreak: 'break-word',
      lineClamp: 3,
      boxOrient: 'vertical',
      paddingTop: 32,
      // paddingBottom: 24,
      // textOverflow: 'ellipsis',
      // overflow: 'hidden',
      // display: '-webkit-box',
    },
  }
})
