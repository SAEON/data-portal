import Loading from '../../../../../../../../components/loading'
import { gql, useQuery } from '@apollo/client'
import ChartIcon from 'mdi-react/ChartBoxOutlineIcon'
import { useTheme } from '@mui/material/styles';
import useStyles from './style'
import clsx from 'clsx'
import Header from './header'

export default ({ id, dashboardId }) => {
  const classes = useStyles()
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
    <div className={clsx(classes.layout)}>
      <Header {...chart} dashboardId={dashboardId} />
      <div style={{ height: 'calc(100% - 32px)', overflow: 'hidden', padding: theme.spacing(2) }}>
        <ChartIcon size="100%" />
      </div>
    </div>
  )
}
