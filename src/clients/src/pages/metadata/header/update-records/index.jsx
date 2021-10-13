import { useContext } from 'react'
import UpdateIcon from 'mdi-react/ContentSaveAllIcon'
import Button from '@material-ui/core/Button'
import { context as submissionsContext } from '../../context'
import Tooltip from '@material-ui/core/Tooltip'

export default () => {
  const { selectedRows } = useContext(submissionsContext)

  return (
    <Tooltip title="Save changed metadata records">
      <span>
        <Button
          disabled={selectedRows.size < 1}
          onClick={() => alert('Not implemented yet')}
          startIcon={<UpdateIcon size={18} />}
          size="small"
          variant="text"
        >
          Update record(s)
        </Button>
      </span>
    </Tooltip>
  )
}
