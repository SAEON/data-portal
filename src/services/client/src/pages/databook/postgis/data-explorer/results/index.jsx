import { useContext } from 'react'
import { context as databooksContext } from '../../../context'
import { Toolbar, IconButton, Typography, Fade } from '@material-ui/core'
import VirtualTable from '../../../../../components/virtual-table'
import AddItemIcon from 'mdi-react/ViewGridAddIcon'
import clsx from 'clsx'
import { gql } from '@apollo/client'
import useStyles from './style'
import { useTheme } from '@material-ui/core/styles'
import { WithGqlQuery } from '../../../../../hooks'
import Loading from '../../../../../components/loading'

export default () => {
  const { sql, databook } = useContext(databooksContext)
  const theme = useTheme()
  const classes = useStyles()
  return (
    <WithGqlQuery
      QUERY={gql`
        query($id: ID!, $sql: String!) {
          browserClient {
            databook(id: $id) {
              id
              execute(sql: $sql)
            }
          }
        }
      `}
      variables={{ id: databook.doc._id, sql }}
    >
      {({ error, loading, data }) => {
        if (error) {
          return <Typography>{error.message}</Typography>
        }

        if (loading) {
          return <Loading />
        }

        return (
          <Fade in={Boolean(data)}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: theme.palette.common.white,
              }}
            >
              <Toolbar variant="dense" className={clsx(classes.toolbar)}>
                <IconButton style={{ color: theme.palette.primary.light }} size="small">
                  <AddItemIcon />
                </IconButton>
              </Toolbar>
              <div style={{ position: 'relative', height: 'calc(100% - 48px)' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                  }}
                >
                  <VirtualTable data={data.browserClient.databook.execute} />
                </div>
              </div>
            </div>
          </Fade>
        )
      }}
    </WithGqlQuery>
  )
}
