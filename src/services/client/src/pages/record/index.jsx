import { useState } from 'react'
import { gql } from '@apollo/client'
import Loading from '../../components/loading'
import Footer from '../../components/footer'
import { setShareLink } from '../../hooks/use-share-link'
import WithGqlQuery from '../../hooks/with-gql-query'
import FieldView from './field-view'
import Header from './header'
import CodeView from './code-view'
import { CATALOGUE_CLIENT_ADDRESS } from '../../config'

export default ({ id }) => {
  setShareLink({
    uri: `${CATALOGUE_CLIENT_ADDRESS}/render/record?id=${id}`,
    params: false,
  })

  const [codeView, updateCodeView] = useState(false)

  return (
    <WithGqlQuery
      QUERY={gql`
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
      `}
      variables={{ identifiers: [id], size: 1 }}
    >
      {({ loading, error, data }) => {
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
            {codeView ? (
              <CodeView
                codeView={codeView}
                json={data?.catalogue?.records?.nodes?.[0]?.metadata?._source}
              />
            ) : (
              <FieldView
                codeView={codeView}
                {...data?.catalogue?.records?.nodes?.[0]?.metadata?._source}
              />
            )}
            <Footer />
          </>
        )
      }}
    </WithGqlQuery>
  )
}
