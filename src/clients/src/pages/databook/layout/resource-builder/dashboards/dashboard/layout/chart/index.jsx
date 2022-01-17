import Loading from '../../../../../../../../components/loading'
import { gql, useQuery } from '@apollo/client'
import ChartIcon from 'mdi-react/ChartBoxOutlineIcon'
import { useTheme, styled, alpha } from '@mui/material/styles'
import Header from './header'

const Div = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: alpha(theme.palette.secondary.light, 0.1),
  position: 'relative',
  overflow: 'hidden',
}))

export default ({ id, dashboardId }) => {
  const theme = useTheme()

  const { error, loading, data } = useQuery(
    gql`
      query ($ids: [ID!]!) {
        charts(ids: $ids) {
          id
          title
        }
      }
    `,
    {
      variables: {
        ids: [id],
      },
    }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  const chart = data.charts[0]

  return (
    <Div>
      <Header {...chart} dashboardId={dashboardId} />
      <div style={{ height: 'calc(100% - 32px)', overflow: 'hidden', padding: theme.spacing(2) }}>
        <ChartIcon size="100%" />
      </div>
    </Div>
  )
}
