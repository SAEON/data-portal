import { useState } from 'react'
import { gql } from '@apollo/client'
import Loading from '../../components/loading'
import Footer from '../../components/footer'
import { WithQglQuery, setShareLink } from '../../hooks'
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
    <WithQglQuery
      QUERY={gql`
        query catalogue($ids: [ID!], $size: Int) {
          catalogue {
            id
            records(ids: $ids, size: $size) {
              nodes {
                metadata
              }
            }
          }
        }
      `}
      variables={{ ids: [id], size: 1 }}
    >
      {({ loading, error, data }) => {
        if (error) {
          throw new Error(`Error retrieving record ${id}. ${error}`)
        }

        return loading ? (
          <Loading />
        ) : (
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
    </WithQglQuery>
  )
}
