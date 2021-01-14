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
          throw new Error(`Error retrieving record ${id}. ${error}`)
        }

        return (
          <>
            <Header
              codeView={codeView}
              toggleCodeView={() => updateCodeView(!codeView)}
              {...data?.catalogue?.records?.nodes?.[0]?.metadata?._source}
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
