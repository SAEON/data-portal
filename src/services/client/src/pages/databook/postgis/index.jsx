import SplitPane from 'react-split-pane'
import useStyles from './style'
import clsx from 'clsx'
import SchemaExplorer from './schema-explorer'
import DataExplorer from './data-explorer'

export default () => {
  const classes = useStyles()

  return (
    <div className={clsx(classes.root)} style={{ marginTop: 48 }}>
      <SplitPane minSize={130} defaultSize={300} split="vertical">
        <SchemaExplorer />
        <DataExplorer />
      </SplitPane>
    </div>
  )
}
