import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Header from './header'
import useTheme from '@material-ui/core/styles/useTheme'

export default () => {
  const theme = useTheme()

  return (
    <>
      <Header />
      <div style={{ margin: theme.spacing(1) }} />
      <Container style={{ minHeight: 1000 }}>
        <Card variant="outlined" style={{ backgroundColor: theme.backgroundColor }}>
          <CardContent>Curation tools</CardContent>
        </Card>
      </Container>
    </>
  )
}
