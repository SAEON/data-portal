import TreeView from './tree-view/index'

export default props => {
  return (
    <div style={{ backgroundColor: 'rgb(255,255,255)', height: '100%' }}>
      <TreeView databook={props.data.browserClient.databook}></TreeView>
    </div>
  )
}
