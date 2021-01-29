import { makeStyles, fade } from '@material-ui/core/styles'

export default makeStyles(theme => {
  console.log('theme', theme)
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
    icon: {
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
      float: 'right',
    },
    iconActice: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.light,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
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
    },
    drawer: {
      width: 400,
      margin: '10px',
      '& .close-button': { color: theme.palette.info.dark },
    },
  }
})
