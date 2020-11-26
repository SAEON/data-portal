import TreeView from './tree-view/index'
import useStyles from './style'
import clsx from 'clsx'

export default () => {
  const classes = useStyles()
  return (
    <div className={clsx(classes.layout)}>
      <TreeView />
    </div>
  )
}
