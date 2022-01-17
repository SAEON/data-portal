import { useContext } from 'react'
import Loading from '../../../../components/loading'
import { context as dataContext } from '../../contexts/data-provider'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import VirtualTable from '../../../../components/virtual-table'
import Timer from '../../../../components/timer'
import { styled } from '@mui/material/styles'

const MsgBox = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1),
  fontFamily: 'monospace',
}))

const Layout = styled('div')({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
})

const Content = ({ error, loading, data }) => {
  if (loading) {
    return (
      <Fade key="loading" in={Boolean(loading)}>
        <span>
          <Loading />
          <MsgBox>
            <Timer />
          </MsgBox>
        </span>
      </Fade>
    )
  }

  if (error) {
    return (
      <Fade key="error" in={Boolean(error)}>
        <span>
          {error.name === 'AbortError' ? (
            <MsgBox>Cancelled</MsgBox>
          ) : (
            <MsgBox>{error.message}</MsgBox>
          )}
        </span>
      </Fade>
    )
  }

  if (!data) {
    return (
      <Fade key="no-data" in={Boolean(!data)}>
        <span>
          <MsgBox>[ no results ]</MsgBox>
        </span>
      </Fade>
    )
  }

  if (!data.length) {
    return (
      <Fade key="empty-data" in={Boolean(data)}>
        <span>
          <MsgBox>[ no results ]</MsgBox>
        </span>
      </Fade>
    )
  }

  return (
    <Fade key="data" in={Boolean(data)}>
      <div
        style={{
          position: 'relative',
          height: '100%',
        }}
      >
        <Layout>
          <VirtualTable data={data} />
        </Layout>
      </div>
    </Fade>
  )
}

export default () => {
  const ctx = useContext(dataContext)

  return (
    <Layout>
      <Content {...ctx} />
    </Layout>
  )
}
