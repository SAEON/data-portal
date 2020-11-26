import { useContext } from 'react'
import { context as databookContext } from '../../context'
import TreeView from './tree-view/index'

export default () => {
  const { schema } = useContext(databookContext)
  return (
    <div
      style={{
        backgroundColor: 'rgb(255,255,255)',
        padding: '3px',
        height: '100%',
        borderRight: '1px solid rgb(228, 231, 234)',
        overflow: 'auto',
      }}
    >
      <TreeView schema={schema} />
    </div>
  )
}
