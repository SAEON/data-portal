import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../components/loading'
import FieldView from './field-view'
import Header from './header'
import CodeView from './code-view'
import Container from '@material-ui/core/Container'
import Fade from '@material-ui/core/Fade'
import useTheme from '@material-ui/core/styles/useTheme'

export default ({ id }) => {
  const [codeView, updateCodeView] = useState(false)
  const theme = useTheme()

  const { error, loading, data } = useQuery(
    gql`
      query catalogue($identifiers: [String!], $size: Int) {
        catalogue {
          id
          records(identifiers: $identifiers, size: $size) {
            nodes {
              metadata
            }
          }
        }
      }
    `,
    {
      variables: { identifiers: [id], size: 1 },
      fetchPolicy: 'cache-first',
    }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw new Error(
      `Error retrieving record ${id}\n\n${error}\n\nIt is likely that Elasticsearch has not been configured`
    )
  }

  if (!data?.catalogue?.records?.nodes?.[0]?.metadata?._source) {
    throw new Error(
      `Sorry, we cannot find record "${id}". If you think that we SHOULD be able to find this record, please forward this message onto us so that we can look into why it appears to be missing.`
    )
  }

  return (
    <>
      <Header
        codeView={codeView}
        toggleCodeView={() => updateCodeView(!codeView)}
        _source={{ ...data?.catalogue?.records?.nodes?.[0]?.metadata?._source }}
      />
      <div style={{ marginTop: theme.spacing(1) }} />
      <Container>
        <Fade key="code-view-in" in={codeView}>
          <span style={{ display: codeView ? 'inherit' : 'none' }}>
            <CodeView json={data?.catalogue?.records?.nodes?.[0]?.metadata?._source} />
          </span>
        </Fade>
        <Fade key="field-view-in" in={!codeView}>
          <span style={{ display: codeView ? 'none' : 'inherit' }}>
            <FieldView {...data?.catalogue?.records?.nodes?.[0]?.metadata?._source} />
          </span>
        </Fade>
      </Container>
    </>
  )
}
