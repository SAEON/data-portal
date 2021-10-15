import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'

export default () => {
  const theme = useTheme()

  return (
    <>
      <div style={{ margin: theme.spacing(1) }} />
      <Container style={{ minHeight: 1000 }}>
        <Card variant="outlined" style={{ backgroundColor: theme.backgroundColor }}>
          <CardContent>Curation tools</CardContent>
        </Card>
      </Container>
    </>
  )
}
