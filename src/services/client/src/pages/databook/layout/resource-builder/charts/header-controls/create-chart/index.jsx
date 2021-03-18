import { useState, useContext } from 'react'
import PlusIcon from 'mdi-react/PlusIcon'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import Tooltip from '@material-ui/core/Tooltip'
import useTheme from '@material-ui/core/styles/useTheme'
import { context as dataContext } from '../../../../../contexts/data-provider'
import Form from './_form'

export default ({ setActiveTabIndex }) => {
  const theme = useTheme()
  const { data } = useContext(dataContext)
  const [open, setOpen] = useState(false)

  return (
    <div style={{ alignSelf: 'center' }}>
      {/* TOGGLE DIALOGUE */}
      <Tooltip
        title={
          data?.length ? 'Create chart using current data context' : 'Requires active data context'
        }
        placement="left-start"
      >
        <span>
          <IconButton
            disabled={!data?.length}
            style={{ marginLeft: theme.spacing(1) }}
            onClick={() => setOpen(true)}
            size="small"
          >
            <PlusIcon size={14} />
          </IconButton>
        </span>
      </Tooltip>

      {/* DIALOGUE */}
      <Dialog fullWidth maxWidth="sm" open={open} onClose={() => setOpen(false)}>
        <Form setActiveTabIndex={setActiveTabIndex} setOpen={setOpen} />
      </Dialog>
    </div>
  )
}
