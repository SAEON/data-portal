import { useState } from 'react'
import Grid from '@material-ui/core/Grid'
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

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

export default () => {
  const [open, setOpen] = useState(false)

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
          {/* Use splitview to allow for readjustable split dimensions of dialog */}
          <Grid container>
            <Grid item item xs={12} sm={6}>
              <AceEditor
                style={{ height: '90%', width: '90%' }}
                placeholder="Placeholder Text"
                mode="javascript"
                theme="monokai"
                name="blah2"
                //   onLoad={this.onLoad}
                //   onChange={this.onChange}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={`
export default ({ config, data, title, description }) => {
const namesField = config['series-names']
const valuesFields = config['series-values']

return <ReactEcharts theme={theme} option={{}} />`}
                setOptions={{
                  enableBasicAutocompletion: false,
                  enableLiveAutocompletion: false,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReactEcharts
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
            </Grid>
          </Grid>
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
