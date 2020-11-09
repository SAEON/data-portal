import { gql } from '@apollo/client'
import WithGqlQuery from '../../hooks/_with-gql-query'
import Loading from '../../components/loading'
import SplitPane from 'react-split-pane'
import useStyles from './style'
import clsx from 'clsx'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-sql'
import 'ace-builds/src-noconflict/theme-sqlserver'
import 'ace-builds/src-noconflict/ext-language_tools'
import { Toolbar } from '@material-ui/core'

export default ({ id }) => {
  const classes = useStyles()

  return (
    /**
     * Get the Mongo doc describing the databook
     */
    <WithGqlQuery
      QUERY={gql`
        query($id: ID!) {
          browserClient {
            findDatabook(id: $id)
          }
        }
      `}
      variables={{ id }}
    >
      {({ error, loading, data }) => {
        if (error) {
          throw new Error(`Error loading databook ${id}`)
        }

        if (loading) {
          return <Loading />
        }

        return 'hi'
      }}
    </WithGqlQuery>
  )
}
