import { useState, useContext } from 'react'
import PlusIcon from 'mdi-react/PlusIcon'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import Tooltip from '@mui/material/Tooltip'
import { useTheme } from '@mui/material/styles';
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
          data?.length ? 'Create filter using current data context' : 'Requires active data context'
        }
        placement="left-start"
      >
        <span>
          <IconButton
            disabled={Boolean(!data?.length)}
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
