import { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from 'mdi-react/EditIcon'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Paper from '@material-ui/core/Paper'
import Draggable from 'react-draggable'
import AceEditor from 'react-ace'
import ReactEcharts from 'echarts-for-react'
import Split from 'react-split'
import SplitPane from 'react-split-pane'
import clsx from 'clsx'
import useStyles from './style'

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

export default ({ id }) => {
  const [open, setOpen] = useState(false)
  const [userJS, setUserJS] = useState(`
{

}
`)
  const [userOption, setUserOption] = useState({})
  const classes = useStyles()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
        <DialogTitle
          style={{ cursor: 'move', backgroundColor: '#f4f4f4' }}
          id="draggable-dialog-title"
        >
          Custom Chart Creator
        </DialogTitle>
        <DialogContent>
          {/* <Split
            className={clsx(classes.split)}
            sizes={[50, 50]}
            direction="horizontal"
            cursor="col-resize"
            gutterStyle={(dimension, gutterSize, index) => {
              return { backgroundColor: 'rgb(200,200,200)', width: `${gutterSize}px` }
            }}
          > */}
          <SplitPane split="vertical">
            <div id="split-left" className={clsx(classes.splitItem)}>
              <AceEditor
                // style={{ height: '90%', width: '90%' }}
                height="600px"
                width="auto"
                placeholder="Placeholder Text"
                mode="javascript"
                theme="monokai"
                name="blah2"
                //   onLoad={this.onLoad}
                onChange={value => setUserJS(value)}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={userJS}
                setOptions={{
                  enableBasicAutocompletion: false,
                  enableLiveAutocompletion: false,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
              />
              <button
                onClick={() => {
                  const newOption = eval(userJS)
                  console.log('render userJS', userJS)
                  console.log('render evalReturn', newOption)
                  setUserOption(newOption)
                }}
              >
                render
              </button>
            </div>

            <div id="split-right" className={clsx(classes.splitItem)}>
              <ReactEcharts
                style={{ height: '600px' }}
                option={{
                  title: {
                    text: '某站点用户访问来源',
                    subtext: '纯属虚构',
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
                      name: '访问来源',
                      type: 'pie',
                      radius: '50%',
                      data: [
                        { value: 1048, name: '搜索引擎' },
                        { value: 735, name: '直接访问' },
                        { value: 580, name: '邮件营销' },
                        { value: 484, name: '联盟广告' },
                        { value: 300, name: '视频广告' },
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
                }}
              />
            </div>
          </SplitPane>
          {/* </Split> */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
