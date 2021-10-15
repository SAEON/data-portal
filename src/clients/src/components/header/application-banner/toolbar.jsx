import Toolbar from '@mui/material/Toolbar'

export default props => {
  const { style, ...otherProps } = props

  return (
    <Toolbar
      style={Object.assign(
        {
          display: 'flex',
          justifyContent: 'space-between',
        },
        otherProps
      )}
      {...otherProps}
    />
  )
}
