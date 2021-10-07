import { useContext } from 'react'
import DeleteIcon from 'mdi-react/DeleteIcon'
import Button from '@material-ui/core/Button'
import { context as submissionsContext } from '../context'

export default () => {
  const { selectedRows } = useContext(submissionsContext)

  return (
    <Button
      disabled={selectedRows.size < 1}
      onClick={() => alert('Not implemented yet')}
      startIcon={<DeleteIcon size={18} />}
      size="small"
      variant="text"
    >
      Delete record(s)
    </Button>
  )
}
