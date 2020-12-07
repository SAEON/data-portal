import SplitPane from 'react-split-pane'
import SchemaExplorer from './schema'
import QueryEditor from './query-editor'
import Table from './table'
import ResourceBuilder from './resource-builder'

export default () => {
  return (
    <SplitPane
      minSize={130}
      defaultSize={100}
      /*STEVEN:defaultSize=300 changed while deving */ split="vertical"
    >
      <SchemaExplorer />
      <SplitPane
        split="horizontal"
        defaultSize={100} /*STEVEN:defaultSize=500 changed while deving */
      >
        <SplitPane split="vertical" minSize={200} defaultSize={600}>
          <QueryEditor />
          <ResourceBuilder />
        </SplitPane>
        <Table />
      </SplitPane>
    </SplitPane>
  )
}
