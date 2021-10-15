import { useContext } from 'react'
import DeleteIcon from 'mdi-react/DeleteIcon'
import Button from '@mui/material/Button'
import { context as submissionsContext } from '../../context'
import Tooltip from '@mui/material/Tooltip'

export default () => {
  const { selectedRows } = useContext(submissionsContext)

  return (
    <Tooltip title="Delete (unpublished) metadata records">
      <span>
        <Button
          disabled={selectedRows.size < 1}
          onClick={() => alert('Not implemented yet')}
          startIcon={<DeleteIcon size={18} />}
          size="small"
          variant="text"
        >
          Delete record(s)
        </Button>
      </span>
    </Tooltip>
  )
}
