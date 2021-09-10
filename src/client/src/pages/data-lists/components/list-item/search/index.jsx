import { useContext } from 'react'
import { context as listContext } from '../_context'
import CardContent from '@material-ui/core/CardContent'
import useTheme from '@material-ui/core/styles/useTheme'
import Collapse from '../../../../../components/collapse'

export default () => {
  const { update, search } = useContext(listContext)
  const theme = useTheme()

  return (
    <Collapse title="Search" subheader="Configure list search DSL object" defaultExpanded>
      <CardContent>
        <div
          style={{ padding: theme.spacing(1), maxHeight: 400, overflow: 'auto' }}
          contentEditable
        >
          <pre style={{ maxHeight: 800, overflow: 'auto' }}>{JSON.stringify(search, null, 2)}</pre>
        </div>
      </CardContent>
    </Collapse>
  )
}
