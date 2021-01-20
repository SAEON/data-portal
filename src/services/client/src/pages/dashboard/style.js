import { makeStyles, fade } from '@material-ui/core/styles'

export default makeStyles(theme => {
  console.log('theme.palette', theme.palette)
  return {
    layout: {
      backgroundColor: fade(theme.palette.common.white, 0.8),
      margin: theme.spacing(1),
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
    //steven. below possibly deletable at some point
    button: {
      margin: theme.spacing(1),
      width: '150px',
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      borderRadius: '6px',
      justifyContent: 'space-between',
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
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
    // filtersContainer: { flex: 1 },
    // filter: {
    //   width: '250px',
    //   margin: '10px',
    //   // margin: theme.spacing(1),
    //   // float: 'right',
    // },

    textFieldFilled: {
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
        width: '250px',
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
  }
})
