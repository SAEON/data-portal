import { useState, createRef, useContext } from 'react'
import Tooltip from '@mui/material/Tooltip'
import EditIcon from 'mdi-react/EditOutlineIcon'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import PlayIcon from 'mdi-react/PlayArrowIcon'
import Paper from '@mui/material/Paper'
import Draggable from 'react-draggable'
import ReactEcharts from 'echarts-for-react'
import AceEditor from 'react-ace'
import Beautify from 'ace-builds/src-noconflict/ext-beautify'
import SplitPane from 'react-split-pane'
import Alert from '@mui/material/Alert'
import { context as dataContext } from '../../../../contexts/data-provider'
import { useApolloClient, gql } from '@apollo/client'

function PaperComponent(props) {
  return (
    <Draggable
      bounds="body"
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} style={{ margin: 0 }} />
    </Draggable>
  )
}

const initialEchartOptions = {
  title: {
    text: 'some title',
    subtext: 'some subtext',
    left: 'center',
  },
  series: [
    {
      name: 'series 1',
      type: 'pie',
      data: [
        {
          value: 1048,
          name: 'val1',
        },
        {
          value: 735,
          name: 'val2',
        },
      ],
    },
  ],
}
const initialEditorText = `function setOption(data) {
  //Your data prop is your SQL Editor results and is available here
  //Beautify => ctrl + shift + B
  console.log('setOption data', data)
  console.log('this echarts instance',this)
  return ({
    title: {
      text: 'some title',
      subtext: 'some subtext',
      left: 'center',
    },
    series: [{
      name: 'series 1',
      type: 'pie',
      data: [{
        value: 1048,
        name: 'val1',
      },
        {
          value: 735,
          name: 'val2',
        },
      ],
    },
    ],
  })
}`

const CHARTS_QUERY = gql`
  query ($ids: [ID]!) {
    charts(ids: $ids) {
      id
      title
      description
      type
      setOption
    }
  }
`

/*STEVEN: 
  -Data parameter is available within the context of the Custom Chart Creator and seemingly within context of dashboard page. I haven't tested for any bugs here
  -This page is intended for the custom chart creator tool but is currently available to any chart type. I haven't tested what would happen if you edited a different
  chart type but probably not good things. Probably best to rename this to _custom-chart-edit-button OR also handle regular chart editing in here
  -Ace Editor mode is still set to typescript as I haven't figured out the esversion issue
  -draggable (PaperComponent) hasn't been replaced with snap-menu yet
*/

export default ({ id: chartId }) => {
  const [open, setOpen] = useState(false)
  const [editorText, setEditorText] = useState(initialEditorText)
  const [echartOption, setEchartOption] = useState(initialEchartOptions)
  const [error, setError] = useState('error goes here')
  const [showError, setShowError] = useState(false)
  let aceRef = createRef()
  let echartRef = createRef()
  const client = useApolloClient()
  const { data } = useContext(dataContext)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleAceEditorOnChange = (value, event) => {
    setEditorText(value)
  }

  const createFunction = (params, functionString) => {
    let func = new Function(...params, 'return ' + functionString)()
    return func
  }
  const dialogContentHeight = '600px'

  return (
    <div>
      <Tooltip title="Edit chart" placement="left-start">
        <IconButton
          onClick={() => {
            handleClickOpen()
          }}
          size="small"
        >
          <EditIcon size={20} />
        </IconButton>
      </Tooltip>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
      >
        <DialogTitle
          sx={theme => ({
            cursor: 'move',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            textAlign: 'center',
          })}
          id="draggable-dialog-title"
        >
          Custom Chart Creator
        </DialogTitle>
        <DialogContent
          sx={{
            padding: '0px',
            height: dialogContentHeight,
          }}
        >
          <SplitPane
            split="vertical"
            minSize={200}
            maxSize={1000}
            defaultSize={600}
            style={{ height: dialogContentHeight }}
          >
            <div id="split-left" style={{ height: dialogContentHeight }}>
              <Tooltip title="render chart" placement="bottom">
                <IconButton
                  sx={{
                    position: 'absolute',
                    zIndex: 5,
                    right: '5px',
                    top: '5px',
                    color: 'orange',
                  }}
                  onClick={() => {
                    let newFunctionContent = editorText
                    let newUserFunction
                    try {
                      newUserFunction = createFunction(['data'], newFunctionContent)
                    } catch (error) {
                      console.error(error)
                      setError(`${error.name}: ${error.message}`)
                      setShowError(true)
                      return
                    }
                    setEchartOption(newUserFunction.call(echartRef.current, data.rows))
                  }}
                  size="small"
                >
                  <PlayIcon />
                </IconButton>
              </Tooltip>
              <AceEditor
                ref={aceRef} //probably wont be needed but may be useful for read only segments / grabbing user text
                commands={Beautify.commands}
                width="auto"
                height="100%"
                // mode="javascript"
                mode="typescript"
                theme="monokai"
                name="Custom Chart Creator Editor"
                onChange={handleAceEditorOnChange}
                fontSize={14}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                value={editorText}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2,
                  esversion: 9,
                  esnext: false,
                }}
              />

              {showError ? (
                <Alert
                  onClick={() => setShowError(false)}
                  style={{ position: 'absolute', bottom: '0px', zIndex: 4 }}
                  severity="error"
                  action={
                    <IconButton size="small">
                      <CloseIcon size={5} />
                    </IconButton>
                  }
                >
                  {error}
                </Alert>
              ) : undefined}
            </div>

            <div id="split-right">
              <ReactEcharts
                ref={e => {
                  echartRef.current = e
                }}
                style={{ height: dialogContentHeight }}
                option={echartOption}
              />
            </div>
          </SplitPane>
        </DialogContent>
        <div
          id="dialog-actions"
          style={{
            position: 'absolute',
            right: '0px',
            bottom: '10px',
          }}
        >
          <Button onClick={handleClose} sx={{ color: theme => theme.palette.grey['A700'] }}>
            Cancel
          </Button>
          <Button
            sx={{
              marginLeft: 'auto',
            }}
            onClick={async () => {
              await client.mutate({
                mutation: gql`
                  mutation ($id: ID!, $setOption: FunctionString) {
                    editChart(id: $id, setOption: $setOption) {
                      id
                      setOption
                    }
                  }
                `,
                variables: {
                  id: chartId,
                  setOption: editorText,
                },
                update: (cache, { data }) => {
                  const { charts } = cache.read({
                    query: CHARTS_QUERY,
                    variables: {
                      ids: [chartId],
                    },
                  })
                  const updatedChart = Object.assign(
                    {},
                    { ...charts },
                    {
                      setOption: editorText,
                    }
                  )

                  cache.writeQuery({
                    query: CHARTS_QUERY,
                    data: {
                      charts: [updatedChart],
                    },
                  })
                },
              })
              handleClose()
            }}
          >
            Save
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
