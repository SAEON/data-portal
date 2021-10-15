import { useContext, useMemo, useState } from 'react'
import UpdateIcon from 'mdi-react/ContentSaveAllIcon'
import Button from '@mui/material/Button'
import { context as metadataContext } from '../../context'
import Tooltip from '@mui/material/Tooltip'
import MergeMetadata from './_merge-metadata'
import Dialog from '@mui/material/Dialog'

export default () => {
  const { selectedRows, changes, setChanges } = useContext(metadataContext)
  const [open, setOpen] = useState(false)

  const selectedChanges = useMemo(() => {
    return [...selectedRows].map(id => changes[id]).filter(_ => _)
  }, [changes, selectedRows])

  return (
    <>
      <Tooltip title={`Save ${selectedChanges.length} changed metadata records`}>
        <span>
          <Button
            disabled={selectedChanges.length < 1}
            onClick={() => setOpen(true)}
            startIcon={<UpdateIcon size={18} />}
            size="small"
            variant="text"
          >
            {`Update record${selectedChanges.length > 1 ? 's' : ''}`}
          </Button>
        </span>
      </Tooltip>
      <Dialog
        scroll="paper"
        onClose={(e, reason) => {
          if (reason) {
            return
          }
          setOpen(false)
        }}
        open={open}
      >
        <MergeMetadata
          setOpen={setOpen}
          setChanges={setChanges}
          changes={changes}
          selectedChanges={selectedChanges}
        />
      </Dialog>
    </>
  )
}
