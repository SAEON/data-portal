// import { makeStyles } from '@material-ui/core/styles'
import TreeView from './tree-view/index'

// const useStyles = makeStyles({
//   root: {
//     height: 240,
//     flexGrow: 1,
//     maxWidth: 400,
//   },
// })

export default props => {
  // console.log('schema props', props)
  // const classes = useStyles()

  /* STEVEN TODO: Map array of databooks passed here as <TreeView/>'s instead of just a single <TreeView/> 
  Its possible the extra databooks aren't being passed here through props. To look into it further*/
  return <TreeView databook={props.data.browserClient.databook}></TreeView>
}
