import Toolbar from '@material-ui/core/Toolbar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import clsx from 'clsx'
import useStyles from '../../../style'
import AddEditor from './_add-editor-button'
import ExecuteQuery from './_execute-query-button'
import AbortQuery from './_abort-query-button'
import Label from '../../../components/tab-label'

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
            label={<Label title={`Query editor ${id}`}>{i + 1}</Label>}
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
