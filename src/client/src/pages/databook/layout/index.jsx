import SplitPane from 'react-split-pane'
import SchemaExplorer from './schema-explorer'
import SqlEditor from './sql-editor'
import ResourceBuilder from './resource-builder'
import DataTable from './data-table'

export default () => {
  return (
    <SplitPane minSize={130} defaultSize={300} split="vertical">
      <SchemaExplorer />
      <SplitPane split="horizontal" defaultSize={500}>
        <SplitPane split="vertical" minSize={200} defaultSize={600}>
          <SqlEditor />
          <ResourceBuilder />
        </SplitPane>
        <DataTable />
      </SplitPane>
    </SplitPane>
  )
}
