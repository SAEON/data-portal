import useSummary from './_summary'
import Search from '../../../components/search'
import useTheme from '@material-ui/core/styles/useTheme'
import Container from '@material-ui/core/Container'
import { alpha } from '@material-ui/core/styles/colorManipulator'
import Toolbar from '@material-ui/core/Toolbar'
import FancyButton from '../../../components/fancy-button'

export default () => {
  const theme = useTheme()
  const { data } = useSummary()

  const count = data?.catalogue.records.totalCount

  return (
    <Toolbar
      style={{
        backgroundColor: alpha(theme.palette.common.black, 0.7),
        height: '80vh',
      }}
    >
      <Container style={{ display: 'flex', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexBasis: 0, flexGrow: 1 }}>
          <Search style={{ width: '100%' }} minHeight={theme.spacing(24)} />
        </div>
        <div
          style={{
            display: 'flex',
            flexBasis: 0,
            marginLeft: theme.spacing(2),
          }}
        >
          <FancyButton
            disabled={count === 0}
            title={`${
              isNaN(count) ? '...' : count === 0 ? 'No search results' : `Explore ${count} datasets`
            }`}
          />
        </div>
      </Container>
    </Toolbar>
  )
}
