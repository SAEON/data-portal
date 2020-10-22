import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

export default makeStyles(theme => {
  return {
    card: {
      transitionTimingFunction: theme.transitions.easing,
      transitionProperty: 'all',
      transitionDuration: theme.transitions.duration,
      backgroundColor: fade(theme.palette.common.white, 0.85),
      '&:hover': {
        backgroundColor: theme.palette.common.white,
        boxShadow: theme.boxShadow,
      },
    },

    // Title
    titleContent: {
      paddingBottom: 0,
    },
    title: {
      lineHeight: 1.5,
      cursor: 'pointer',
      display: 'block',
      fontSize: '1rem',
      textAlign: 'center',
    },

    // Author
    authorContent: {
      paddingTop: 8,
    },
    author: {
      lineHeight: 1.5,
      display: 'block',
      textAlign: 'center',
    },

    // Description
    descriptionContent: {},
    description: {
      cursor: 'pointer',
      fontSize: '0.8rem',
      lineHeight: 1.5,
      textAlign: 'justify',
      whiteSpace: 'break-spaces',
      wordBreak: 'break-word',
    },
  }
})
