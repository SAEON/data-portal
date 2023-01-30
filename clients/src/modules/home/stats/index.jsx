import { useContext } from 'react'
import { context as dataContext } from '../context'
import { Div } from '../../../components/html-tags'
import {
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

  if (loading) {
    return null
  }

  const collectionsCount = f(data?.catalogue?.indexStats?.collections) || NaN
  const providersCount = f(data?.catalogue?.indexStats?.providers) || NaN
  const institutionsCount = f(data?.catalogue?.indexStats?.institutions) || NaN
  const themesCount = f(data?.catalogue?.indexStats?.themes) || NaN

  return (
    <Div
      sx={{
        zIndex: 1,
        width: '100%',
      }}
    >
      <Container sx={{ py: 4 }}>
        <Grid container spacing={0} justifyContent="center">
          {collectionsCount !== NaN && collectionsCount > 0 && (
            <Item Icon={DatabaseIcon} title={collectionsCount} content="Collections" />
          )}
          {providersCount !== NaN && providersCount > 0 && (
            <Item Icon={HandshakeIcon} title={providersCount} content="Providers" />
          )}
          {institutionsCount !== NaN && institutionsCount > 0 && (
            <Item Icon={BankIcon} title={institutionsCount} content="Institutions" />
          )}
          {themesCount !== NaN && themesCount > 0 && (
            <Item Icon={CodeTagsIcon} title={themesCount} content="themes" />
          )}
        </Grid>
      </Container>
    </Div>
  )
}
