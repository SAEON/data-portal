import clsx from 'clsx'

export default ({ children, state, classes }) => {
  return (
    <div
      className={clsx({
        [classes.menuContent]: true,
      })}
    >
      <div
        className={clsx({
          [classes.resizing]: state.isResizing,
        })}
      >
        {typeof children === 'function'
          ? children({
              height: state.dimensions.height - 31,
              width: state.dimensions.width,
            })
          : children}
      </div>
    </div>
  )
}
