import { useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import ResetIcon from 'mdi-react/RefreshIcon'
import { context as globalContext } from '../../../../contexts/global'

export default () => {
  const { setGlobal } = useContext(globalContext)

  return (
    <Tooltip title="Reset filters">
      <span>
        <IconButton
          aria-label="Reset filter controls"
          onClick={() =>
            setGlobal({
              extent: undefined,
              terms: [],
              text: '',
            })
          }
        >
          <ResetIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}
