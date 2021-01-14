import { useContext } from 'react'
import { context as databooksContext } from '../../context'
import { Typography, Fade } from '@material-ui/core'
import VirtualTable from '../../../../components/virtual-table'
import Loading from '../../../../components/loading'
import { gql } from '@apollo/client'
import { WithGqlQuery } from '../../../../hooks'
import Header from './header'
import useStyles from '../../style'
import clsx from 'clsx'

export default () => {
  const classes = useStyles()
  const { sql, databook, sqlResult, setSqlResult } = useContext(databooksContext)

  return (
    <WithGqlQuery
      QUERY={gql`
        query($id: ID!, $sql: String!) {
          databook(id: $id) {
            id
            execute(sql: $sql)
          }
        }
      `}
      variables={{ id: databook.doc._id, sql }}
    >
      {({ error, loading, data }) => {
        if (loading) {
          return (
            <div className={clsx(classes.layout, classes.bg)}>
              <Loading />
              <Header />
            </div>
          )
        }

        if (error) {
          return (
            <div className={clsx(classes.layout, classes.bg)}>
              <Fade in={Boolean(error)}>
                <Typography>{error.message}</Typography>
              </Fade>
            </div>
          )
        }

        const postgisData = data.databook.execute
        setSqlResult(postgisData) //STEVEN TO-DO: THROWS WARNING/ERROR - successfully sets state though
        //STEVEN: moved sql results to context. TO-DO: dont pass data as prop. use context everywhere
        return (
          <div className={clsx(classes.layout, classes.bg)}>
            <Header data={postgisData} />

            <Fade in={Boolean(data)}>
              <div className={clsx(classes.content)}>
                <div className={clsx(classes.layout)}>
                  <VirtualTable data={postgisData} />
                </div>
              </div>
            </Fade>
          </div>
        )
      }}
    </WithGqlQuery>
  )
}
