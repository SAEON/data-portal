import { useState, createRef, useContext } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from 'mdi-react/EditOutlineIcon'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import PlayIcon from 'mdi-react/PlayArrowIcon'
import Paper from '@material-ui/core/Paper'
import Draggable from 'react-draggable'
import ReactEcharts from 'echarts-for-react'
import AceEditor from 'react-ace'
import Beautify from 'ace-builds/src-noconflict/ext-beautify'
import SplitPane from 'react-split-pane'
import clsx from 'clsx'
import useStyles from './style'
import Alert from '@material-ui/lab/Alert'
import { context as databookContext } from '../../../../context'

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

export default () => {
  const [open, setOpen] = useState(false)
  const [editorText, setEditorText] = useState(initialEditorText)
  const [echartOption, setEchartOption] = useState(initialEchartOptions)
  const [error, setError] = useState('error goes here')
  const [showError, setShowError] = useState(false)
  let aceRef = createRef()
  let echartRef = createRef()
  //useeffect:
  /*useEffect():
    associate echartsRef.current with echartsinstance at start
    ace will update echartRef
    that will cause echart to update
   * 
   */
  const classes = useStyles()
  const { data } = useContext(databookContext)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleAceEditorOnChange = (value, event) => {
    if (event.start.row <= 2 /*|| final row */) {
      console.log('in read only zone! editor text should not update but it does') //DOESNT WORK
      //https://github.com/securingsincity/react-ace/issues/181
      // return
    }
    // const newValue = value.substring(76, value.length - 2)
    // setUserText(newValue)
    setEditorText(value)
  }

  const createFunction = (params, functionString) => {
    let func = new Function(...params, functionString)
    // const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor //https://stackoverflow.com/questions/42263200/es-2017-async-function-vs-asyncfunctionobject-vs-async-function-expression
    // let speak = new AsyncFunction('word', 'await sleep(1000); return "Hi " + word;')
    // let func = new AsyncFunction(...params, functionString)

    return func
  }

  const dialogContentHeight = '600px'

  let echartsInstance = (
    <ReactEcharts style={{ height: dialogContentHeight }} option={echartOption} /*theme={theme}*/ />
  )
  return (
    <div>
      <Tooltip title="Edit chart" placement="bottom-start">
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
        <DialogTitle className={clsx(classes.dialogTitle)} id="draggable-dialog-title">
          Custom Chart Creator
        </DialogTitle>
        <DialogContent
          className={clsx(classes.dialogContent)}
          style={{
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
                  className={clsx(classes.playButton)}
                  onClick={() => {
                    let newFunctionContent = editorText.substring(27, editorText.length - 2) //Temporary solution till line 1 is read only
                    console.log('newFunctionContent', newFunctionContent)
                    let newUserFunction
                    try {
                      newUserFunction = createFunction(['data'], newFunctionContent) //new Function('data', newFunctionContent)
                    } catch (error) {
                      console.error(error)
                      setError(`${error.name}: ${error.message}`)
                      setShowError(true)
                      return
                    }
                    setEchartOption(
                      newUserFunction.call(echartsInstance, data.rows)

                      // newUserFunction(data.rows)
                    )
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
                // cursorStart={1}
                //   onLoad={this.onLoad}
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
              {/* <ReactEcharts
                style={{ height: dialogContentHeight }}
                option={echartOption}
              /> */}
              {/*STEVEN: should user be given theme by default? */}
            </div>
          </SplitPane>
        </DialogContent>
        <div id="dialog-actions" className={clsx(classes.dialogActions)}>
          <Button onClick={handleClose} className={clsx(classes.cancelButton)}>
            Cancel
          </Button>
          <Button className={clsx(classes.saveButton)} onClick={handleClose}>
            Save
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
