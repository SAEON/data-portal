import SplitPane from 'react-split-pane'
import SchemaExplorer from './schema'
import SqlEditor from './sql'
import Table from './table'
import Dashboard from './dashboard'

export default () => {
  return (
    <SplitPane minSize={130} defaultSize={250} split="vertical">
      <SchemaExplorer />
      <SplitPane split="horizontal" defaultSize={500}>
        <SplitPane split="vertical" minSize={200} defaultSize={600}>
          <SqlEditor />
          <Dashboard />
        </SplitPane>
        <Table />
      </SplitPane>
    </SplitPane>
  )
}
