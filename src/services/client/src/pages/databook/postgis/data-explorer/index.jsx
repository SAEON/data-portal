import { useState } from 'react'
import SqlEditor from './sql-editor'
import ResultsTable from './results'
import SplitPane from 'react-split-pane'
import clsx from 'clsx'
import useStyles from './style'
import { WithQglQuery } from '../../../../hooks'
import Loading from '../../../../components/loading'
import { gql } from '@apollo/client'

export default ({ databook }) => {
  const classes = useStyles()
  const [sql, setSql] = useState('')
  console.log('rendering', databook)

  return (
    <SplitPane split="horizontal" minSize={400}>
      <div className={clsx(classes.root)}>
        <SqlEditor
          sql={sql}
          runQuery={val => {
            setSql(val)
          }}
        />
      </div>
      <WithQglQuery
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
            throw error
          }

          if (loading) {
            return <Loading />
          }
          return JSON.stringify(data.browserClient.databook.execute)
          // return <ResultsTable>{JSON.stringify(data)}</ResultsTable>
        }}
      </WithQglQuery>
    </SplitPane>
  )
}
