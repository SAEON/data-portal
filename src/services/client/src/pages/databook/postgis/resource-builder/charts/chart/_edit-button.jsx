import { useState } from 'react'
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
import AceEditor from 'react-ace'
import ReactEcharts from 'echarts-for-react'
import SplitPane from 'react-split-pane'
import clsx from 'clsx'
import useStyles from './style'
import Alert from '@material-ui/lab/Alert'

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

const sampleJSON = `{
  "title": {
    "text": "some title",
    "subtext": "some subtext",
    "left": "center"
  },
  "tooltip": {
    "trigger": "item"
  },
  "legend": {
    "orient": "vertical",
    "left": "left"
  },
  "series": [
    {
      "name": "series 1",
      "type": "pie",
      "radius": "50%",
      "data": [
        { "value": 1048, "name": "val1" },
        { "value": 735, "name": "val2" },
        { "value": 580, "name": "val3" },
        { "value": 484, "name": "val4" },
        { "value": 300, "name": "val5" }
      ],
      "emphasis": {
        "itemStyle": {
          "shadowBlur": 10,
          "shadowOffsetX": 0,
          "shadowColor": "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
}`
const sampleJS = `var option = {
  title: {
    text: 'some title',
    subtext: 'some subtext',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: 'series 1',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'val1' },
        { value: 735, name: 'val2' },
        { value: 580, name: 'val3' },
        { value: 484, name: 'val4' },
        { value: 300, name: 'val5' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
}`
export default () => {
  const [open, setOpen] = useState(false)
  const [userText, setUserText] = useState(sampleJSON)
  const [userOption, setUserOption] = useState(JSON.parse(sampleJSON))
  const [error, setError] = useState('error goes here')
  const [showError, setShowError] = useState(false)
  const classes = useStyles()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const dialogContentHeight = '600px'
  return (
    <div>
      <Tooltip title="Open chart" placement="bottom-start">
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
                    let newOption = {}
                    try {
                      newOption = JSON.parse(userText)
                      //STEVEN TO-DO: this does not catch errors thrown by echarts
                      //e.g. change series.type from pie to bar and page will crash
                      const validatedChart = <ReactEcharts option={newOption} />
                    } catch (error) {
                      console.error(error)
                      setError(`${error.name}: ${error.message}`)
                      setShowError(true)
                      return
                    }
                    setUserOption(newOption)
                  }}
                  size="small"
                >
                  <PlayIcon />
                </IconButton>
              </Tooltip>
              <AceEditor
                width="auto"
                height="100%"
                mode="json"
                theme="monokai"
                name="Custom Chart Creator Editor"
                cursorStart={1}
                //   onLoad={this.onLoad}
                onChange={value => setUserText(value)}
                fontSize={14}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                value={userText}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2,
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
                style={{ height: dialogContentHeight }}
                option={userOption} /*theme={theme}*/
              />
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
