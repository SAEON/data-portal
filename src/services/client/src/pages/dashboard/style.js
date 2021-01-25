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
    icon: { color: theme.palette.common.white },

    textField: {
      // '& .MuiInputLabel-root': {
      //   color: theme.palette.common.white,
      // },
      // '& .MuiIconButton-label': {
      //   color: theme.palette.common.white,
      // },
      '& .MuiInputBase-root': {
        borderRadius: '4px',
      },
      '& .MuiChip-root': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
        '& .MuiChip-deleteIcon': {
          color: theme.palette.grey[300],
        },
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
      width: 280,
    },
  }
})
