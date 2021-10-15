import useSummary from './_summary'
import Search from '../../../components/search'
import { useTheme, alpha } from '@mui/material/styles';
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import FancyButton from '../../../components/fancy-button'
import Grid from '@mui/material/Grid'

export default () => {
  const theme = useTheme()
  const { data } = useSummary()

  const count = data?.catalogue.records.totalCount

  return (
    <Toolbar
      style={{
        backgroundColor: alpha(theme.palette.common.black, 0.4),
        height: '90vh',
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid xs={12} md={8} lg={9} item>
            <Search style={{ width: '100%' }} minHeight={theme.spacing(24)} />
          </Grid>
          <Grid style={{ minHeight: 112 }} item xs={12} md={4} lg={3}>
            <FancyButton
              disabled={count === 0}
              title={`${
                isNaN(count)
                  ? '...'
                  : count === 0
                  ? 'No search results'
                  : `Explore ${count} datasets`
              }`}
            />
          </Grid>
        </Grid>
      </Container>
    </Toolbar>
  )
}
