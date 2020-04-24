import { makeStyles } from '@material-ui/core'

export default makeStyles(() => {
  return {
    snapOutline: {
      position: 'absolute',
      boxShadow: '0px 0px 7px 3px rgba(140,140,140,1)',
      backgroundColor: 'black',
      opacity: '20%',
    },

    resizing: {
      background: `linear-gradient(to right, #adadad 4px, transparent 4px) 0 0,
    linear-gradient(to right, #adadad 4px, transparent 4px) 0 100%,
    linear-gradient(to left, #adadad 4px, transparent 4px) 100% 0,
    linear-gradient(to left, #adadad 4px, transparent 4px) 100% 100%,
    linear-gradient(to bottom, #adadad 4px, transparent 4px) 0 0,
    linear-gradient(to bottom, #adadad 4px, transparent 4px) 100% 0,
    linear-gradient(to top, #adadad 4px, transparent 4px) 0 100%,
    linear-gradient(to top, #adadad 4px, transparent 4px) 100% 100%`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '20px 20px',
    },
    menuContent: {
      height: 'calc(100% - 35px)',
      padding: '2px',
      '& > div': {
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
      },
    },
  }
})
