import Toolbar from '@material-ui/core/Toolbar'

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
