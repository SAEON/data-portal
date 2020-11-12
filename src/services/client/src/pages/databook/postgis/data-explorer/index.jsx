import { useState } from 'react'
import SqlEditor from './sql-editor'
import ResultsTable from './results'
import SplitPane from 'react-split-pane'
import clsx from 'clsx'
import useStyles from './style'
import { WithQglQuery } from '../../../../hooks'
import Loading from '../../../../components/loading'
import { gql } from '@apollo/client'
import { useTheme } from '@material-ui/core/styles'
import { Fade } from '@material-ui/core'

export default ({ databook }) => {
  const theme = useTheme()
  const classes = useStyles()
  const [sql, setSql] = useState(`select
*,
ST_AsText(wkb_geometry) wkb_geometry  
from odp_be8a4ccb_4afa_47ae_8445_2e56496533e9 obacaaee 
limit 500`)

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

          return (
            <Fade in={data}>
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
                <ResultsTable data={data.browserClient.databook.execute} />
              </div>
            </Fade>
          )
        }}
      </WithQglQuery>
    </SplitPane>
  )
}
