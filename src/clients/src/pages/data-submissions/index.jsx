import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import Header from './header'
import useTheme from '@material-ui/core/styles/useTheme'
import DataGrid, { TextEditor } from 'react-data-grid'

export default () => {
  const theme = useTheme()

  return (
    <>
      <Header />
      <div style={{ margin: theme.spacing(2) }} />
      <Container style={{ minHeight: 1000 }}>
        <Card variant="outlined" style={{ backgroundColor: theme.backgroundColor }}>
          <DataGrid
            columns={[
              { key: 'id', name: 'ID', editor: TextEditor },
              { key: 'title', name: 'Title', editor: TextEditor },
            ]}
            rows={[
              { id: 0, title: 'Example' },
              { id: 1, title: 'Demo' },
            ]}
          />
        </Card>
      </Container>
    </>
  )
}
