import Toolbar from '@mui/material/Toolbar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import clsx from 'clsx'
import useStyles from '../../../style'
import AddEditor from './_add-editor'
import ExecuteQuery from './_execute-query'
import AbortQuery from './_abort-query'
import Label from '../../../components/tab-label'
import SaveSql from './_save-sql'
import CopyCode from './_copy-code'

export default ({
  editors,
  activeTabIndex,
  setActiveTabFn,
  addEditorFn,
  executeQueryFn,
  cancelQueryFn,
  saveSqlFn,
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
            style={{
              minWidth: 'unset',
              width: 50,
            }}
            key={id}
            label={<Label title={`Query editor ${id}`}>{i + 1}</Label>}
            id={`tab-${id}`}
          />
        ))}
      </Tabs>

      {/* BUTTONS */}
      <AddEditor onClick={addEditorFn} />
      <SaveSql onClick={saveSqlFn} />
      <CopyCode />
      <AbortQuery onClick={cancelQueryFn} />
      <ExecuteQuery onClick={executeQueryFn} />
    </Toolbar>
  )
}
