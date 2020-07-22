import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  //work in progress styling to transition height of citation dialog as content changes
  dialogGrid: {
    // height: 'auto',
    // overflow: 'hidden',
    transition: 'transition: height 5s ease 1s',
    // maxHeight: '150px',

    '&:hover': {
      // transition: 'background-color 250ms linear, opacity 250ms linear',
      // maxHeight: '1000px',
      // opacity: 1,
    },
    '&:not(:hover)': {
      // opacity: 0.3,
      // transition: 'background-color 250ms linear, opacity 250ms linear',
    },
  },

  tab: {
    minWidth: 100,
    '&:hover': {
      transition: 'opacity 150ms linear',
      opacity: 1,
    },
    '&:not(:hover)': {
      opacity: 0.8,
      transition: 'opacity 150ms linear',
    },
  },
}))
