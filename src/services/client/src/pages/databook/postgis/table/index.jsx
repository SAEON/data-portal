import { useContext } from 'react'
import { context as databooksContext } from '../../context'
import { Typography, Fade } from '@material-ui/core'
import VirtualTable from '../../../../components/virtual-table'
import Loading from '../../../../components/loading'
import { gql } from '@apollo/client'
import { WithGqlQuery } from '../../../../hooks'
import Header from './header'
import useStyles from './style'
import clsx from 'clsx'

export default () => {
  const classes = useStyles()
  const { sql, databook } = useContext(databooksContext)

  return (
    <div className={clsx(classes.layout, classes.bg)}>
      <Header />
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
            return (
              <Fade in={Boolean(error)}>
                <Typography>{error.message}</Typography>
              </Fade>
            )
          }

          if (loading) {
            return <Loading />
          }

          return (
            <Fade in={Boolean(data)}>
              <div className={clsx(classes.content)}>
                <div className={clsx(classes.layout)}>
                  <VirtualTable data={data.browserClient.databook.execute} />
                </div>
              </div>
            </Fade>
          )
        }}
      </WithGqlQuery>
    </div>
  )
}
