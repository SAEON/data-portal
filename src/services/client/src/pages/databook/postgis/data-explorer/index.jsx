import SqlEditor from './sql-editor'
import ResultsTable from './results'
import SplitPane from 'react-split-pane'
import clsx from 'clsx'
import useStyles from './style'
import DashboardBuilder from './dashboard'

export default () => {
  const classes = useStyles()

  return (
    <SplitPane split="horizontal" minSize={600}>
      {/* SQL EDITOR */}
      <div className={clsx(classes.root)}>
        <SplitPane split="vertical" minSize={200} defaultSize={1000}>
          <SqlEditor />
          <DashboardBuilder />
        </SplitPane>
      </div>

      {/* QUERY RESULTS */}
      <ResultsTable />
    </SplitPane>
  )
}
