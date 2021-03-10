import Toolbar from '@material-ui/core/Toolbar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import clsx from 'clsx'
import useStyles from '../../../style'
import AddEditor from './_add-editor-button'
import ExecuteQuery from './_execute-query-button'
import AbortQuery from './_abort-query-button'

export default ({
  editors,
  activeTabIndex,
  setActiveTabFn,
  addEditorFn,
  executeQueryFn,
  cancelQueryFn,
}) => {
  const classes = useStyles()
  return (
    <Toolbar disableGutters variant="dense" className={clsx(classes.toolbar)}>
      {/* EDITORS */}
      <Tabs
        indicatorColor="primary"
        variant={editors.length > 5 ? 'scrollable' : 'standard'}
        value={activeTabIndex}
        onChange={setActiveTabFn}
      >
        {editors.map(({ id }, i) => (
          <Tab
            key={id}
            className={clsx(classes.tab)}
            label={
              <Tooltip title={`Query editor ${id}`}>
                <Avatar className={clsx(classes.smallAvatar)} variant="circular">
                  {i + 1}
                </Avatar>
              </Tooltip>
            }
            id={`tab-${id}`}
          />
        ))}
      </Tabs>

      {/* BUTTONS */}
      <AddEditor onClick={addEditorFn} />
      <AbortQuery onClick={cancelQueryFn} />
      <ExecuteQuery onClick={executeQueryFn} />
    </Toolbar>
  )
}
