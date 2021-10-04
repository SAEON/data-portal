import Container from '@material-ui/core/Container'
import Header from './header'
import useTheme from '@material-ui/core/styles/useTheme'
import DataGrid, { TextEditor } from 'react-data-grid'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../components/loading'

export default () => {
  const theme = useTheme()

  const { error, loading, data } = useQuery(
    gql`
      query {
        indexedMetadata {
          id
          doi
          sid
          institution
          collection
          schema
          validated
          errors
          state
          metadata
        }
      }
    `
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  return (
    <>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <DataGrid
          style={{ height: '100%' }}
          columns={[
            { key: 'id', name: 'ID' },
            { key: 'doi', name: 'DOI' },
            { key: 'sid', name: 'SID' },
            { key: 'institution', name: 'Institution', editor: TextEditor },
            { key: 'collection', name: 'Collection', editor: TextEditor },
            { key: 'schema', name: 'Schema' },
            { key: 'validated', name: 'Validated', editor: TextEditor },
            { key: 'errors', name: 'Errors' },
            { key: 'state', name: 'State' },
            { key: 'metadata', name: 'Metadata', editor: TextEditor },
          ]}
          rows={data.indexedMetadata.map(
            ({
              id,
              doi,
              sid,
              institution,
              collection,
              schema,
              validated,
              errors,
              state,
              metadata,
            }) => ({
              id,
              doi,
              sid,
              institution,
              collection,
              schema,
              validated: '' + validated,
              errors: JSON.stringify(errors).truncate(50),
              state,
              metadata: JSON.stringify(metadata).truncate(50),
            })
          )}
        />
      </div>
    </>
  )
}
