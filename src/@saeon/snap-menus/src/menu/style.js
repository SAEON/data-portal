import { makeStyles } from '@material-ui/core/styles'

export default ({ height, width }) =>
  makeStyles(() => {
    return {
      ghost: {
        position: 'absolute',
        boxShadow: '0px 0px 7px 3px rgba(140,140,140,1)',
        backgroundColor: 'black',
        opacity: '20%',
      },
      TopLeft: {
        height: height / 2,
        width: width / 2,
        left: 0,
      },
      TopRight: {
        height: height / 2,
        width: width / 2,
        right: 0,
      },
      BottomLeft: {
        height: height / 2,
        width: width / 2,
        top: height / 2,
        left: 0,
      },
      BottomRight: {
        height: height / 2,
        width: width / 2,
        top: height / 2,
        right: 0,
      },
      Left: {
        height,
        width: width / 2,
        left: 0,
      },
      Right: {
        height,
        width: width / 2,
        right: 0,
      },
      Top: {
        height,
        width,
        left: 0,
        right: 0,
      },
      Bottom: {
        height: height / 2,
        width,
        top: height / 2,
        left: 0,
        right: 0,
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
