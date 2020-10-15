// import React, { forwardRef } from 'react'
// import { Link, Route } from 'react-router-dom'
// import { MenuItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core'

// export default forwardRef(({ title, label, to, Icon, exact = true, href }, ref) => (
//   <Route path={to} exact={exact}>
//     {({ match }) => {
//       return (
//         <Tooltip title={title} placement="right">
//           <MenuItem
//             innerRef={ref}
//             component={href ? 'a' : Link}
//             active={match}
//             rel={href && 'noopener noreferrer'}
//             target={href && '_blank'}
//             to={to}
//             href={href}
//           >
//             <ListItemIcon>{<Icon color={match ? 'primary' : 'inherit'} />}</ListItemIcon>
//             <ListItemText primary={label} />
//           </MenuItem>
//         </Tooltip>
//       )
//     }}
//   </Route>
// ))
