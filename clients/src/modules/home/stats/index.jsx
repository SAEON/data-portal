import { useContext } from 'react'
import { context as dataContext } from '../context'
import { Div } from '../../../components/html-tags'
import {
  CodeJson as RecordsIcon,
  Database as DatabaseIcon,
  CodeTags as CodeTagsIcon,
  Handshake as HandshakeIcon,
  Bank as BankIcon,
} from '../../../components/icons'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Item from './_item'

const f = n => (n >= 10000 ? '10000+' : n)

export default () => {
  const { loading, data } = useContext(dataContext)

  const recordsCount = f(data?.catalogue?.indexStats?.records) || NaN
  const collectionsCount = f(data?.catalogue?.indexStats?.collections) || NaN
  const providersCount = f(data?.catalogue?.indexStats?.providers) || NaN
  const institutionsCount = f(data?.catalogue?.indexStats?.institutions) || NaN
  const themesCount = f(data?.catalogue?.indexStats?.themes) || NaN

  return (
    <Div
      sx={theme => ({
        zIndex: 1,
        width: '100%',
        [theme.breakpoints.down('sm')]: {
          display: 'flex',
          flex: 1,
          alignItems: 'center',
        },
      })}
    >
      <Container sx={{ py: 4 }}>
        <Grid container spacing={0} justifyContent="center">
          <Item Icon={BankIcon} title={institutionsCount || '..'} content="Institutions" />
          <Item Icon={HandshakeIcon} title={providersCount || '..'} content="Providers" />
          <Item Icon={DatabaseIcon} title={collectionsCount || '..'} content="Collections" />
          <Item Icon={RecordsIcon} title={recordsCount || '....'} content="Records" />
          {/* <Item Icon={CodeTagsIcon} title={themesCount || '....'} content="themes" /> */}
        </Grid>
      </Container>
    </Div>
  )
}
