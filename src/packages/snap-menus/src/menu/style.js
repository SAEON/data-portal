import { makeStyles } from '@material-ui/core/styles'

export default ({ containerHeight, containerWidth, HORIZONTAL_MARGIN }) => {
  const m = HORIZONTAL_MARGIN / 2
  return makeStyles(() => {
    return {
      ghost: {
        position: 'absolute',
        boxShadow: '0px 0px 7px 3px rgba(140,140,140,1)',
        backgroundColor: 'black',
        opacity: '20%',
      },
      TopLeft: {
        height: containerHeight / 2 - m,
        width: containerWidth / 2 - m,
        left: 0,
      },
      TopRight: {
        height: containerHeight / 2 - m,
        width: containerWidth / 2 - m,
        right: 0,
      },
      BottomLeft: {
        height: containerHeight / 2 - m,
        width: containerWidth / 2 - m,
        top: containerHeight / 2 + m,
        left: 0,
      },
      BottomRight: {
        height: containerHeight / 2 - m,
        width: containerWidth / 2 - m,
        top: containerHeight / 2 + m,
        right: 0,
      },
      Left: {
        height: containerHeight,
        width: containerWidth / 2 - m,
        left: 0,
      },
      Right: {
        height: containerHeight,
        width: containerWidth / 2 - m,
        right: 0,
      },
      Top: {
        height: containerHeight,
        width: containerWidth,
        left: 0,
        right: 0,
      },
      Bottom: {
        height: containerHeight / 2 - m,
        width: containerWidth,
        top: containerHeight / 2 - m,
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
}
