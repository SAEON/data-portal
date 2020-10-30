import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

export default makeStyles(theme => {
  return {
    card: {
      transitionTimingFunction: theme.transitions.easing.easeInOut,
      transitionProperty: 'all',
      transitionDuration: theme.transitions.duration.standard,
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
      textAlign: 'center',
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
      color: theme.palette.text.primary,
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
      color: theme.palette.text.primary,
      cursor: 'pointer',
      fontSize: '0.8rem',
      lineHeight: 1.5,
      textAlign: 'justify',
      whiteSpace: 'break-spaces',
      wordBreak: 'break-word',
      lineClamp: 3,
      boxOrient: 'vertical',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      display: '-webkit-box',
    },
  }
})
