export default () => {}
// import { makeStyles } from '@material-ui/core/styles'

// export default makeStyles(() => ({
//   ghost: {
//     position: 'absolute',
//     boxShadow: '0px 0px 7px 3px rgba(140,140,140,1)',
//     backgroundColor: 'black',
//     opacity: '20%',
//   },
//   TopLeft: ({ PORTAL, GHOST_GUTTER_X, GHOST_GUTTER_Y }) => ({
//     height: PORTAL.offsetHeight / 2 - GHOST_GUTTER_Y,
//     width: PORTAL.offsetWidth / 2 - GHOST_GUTTER_X,
//     left: 0,
//   }),
//   TopRight: ({ PORTAL, GHOST_GUTTER_X, GHOST_GUTTER_Y }) => ({
//     height: PORTAL.offsetHeight / 2 - GHOST_GUTTER_Y,
//     width: PORTAL.offsetWidth / 2 - GHOST_GUTTER_X,
//     right: 0,
//   }),
//   BottomLeft: ({ PORTAL, GHOST_GUTTER_X, GHOST_GUTTER_Y }) => ({
//     height: PORTAL.offsetHeight / 2 - GHOST_GUTTER_Y,
//     width: PORTAL.offsetWidth / 2 - GHOST_GUTTER_X,
//     top: PORTAL.offsetHeight / 2 + GHOST_GUTTER_Y,
//     left: 0,
//   }),
//   BottomRight: ({ PORTAL, GHOST_GUTTER_X, GHOST_GUTTER_Y }) => ({
//     height: PORTAL.offsetHeight / 2 - GHOST_GUTTER_Y,
//     width: PORTAL.offsetWidth / 2 - GHOST_GUTTER_X,
//     top: PORTAL.offsetHeight / 2 + GHOST_GUTTER_Y,
//     right: 0,
//   }),
//   Left: ({ PORTAL, GHOST_GUTTER_X }) => ({
//     height: PORTAL.offsetHeight,
//     width: PORTAL.offsetWidth / 2 - GHOST_GUTTER_X,
//     left: 0,
//   }),
//   Right: ({ PORTAL, GHOST_GUTTER_X }) => ({
//     height: PORTAL.offsetHeight,
//     width: PORTAL.offsetWidth / 2 - GHOST_GUTTER_X,
//     right: 0,
//   }),
//   Top: ({ PORTAL }) => ({
//     height: PORTAL.offsetHeight,
//     width: PORTAL.offsetWidth,
//     left: 0,
//     right: 0,
//   }),
//   Bottom: ({ PORTAL, GHOST_GUTTER_Y }) => ({
//     height: PORTAL.offsetHeight / 2 - GHOST_GUTTER_Y,
//     width: PORTAL.offsetWidth,
//     top: PORTAL.offsetHeight / 2 + GHOST_GUTTER_Y,
//     left: 0,
//     right: 0,
//   }),

//   resizing: {
//     background: `linear-gradient(to right, #adadad 4px, transparent 4px) 0 0,
//     linear-gradient(to right, #adadad 4px, transparent 4px) 0 100%,
//     linear-gradient(to left, #adadad 4px, transparent 4px) 100% 0,
//     linear-gradient(to left, #adadad 4px, transparent 4px) 100% 100%,
//     linear-gradient(to bottom, #adadad 4px, transparent 4px) 0 0,
//     linear-gradient(to bottom, #adadad 4px, transparent 4px) 100% 0,
//     linear-gradient(to top, #adadad 4px, transparent 4px) 0 100%,
//     linear-gradient(to top, #adadad 4px, transparent 4px) 100% 100%`,
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: '20px 20px',
//   },
//   menuContent: ({ MENU_HEADER_HEIGHT }) => ({
//     height: `calc(100% - ${MENU_HEADER_HEIGHT}px)`,
//     '& > div': {
//       height: '100%',
//       overflowY: 'auto',
//       overflowX: 'hidden',
//     },
//   }),
// }))
