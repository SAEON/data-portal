import React, { useState } from 'react'
import { gql } from '@apollo/client'
import { Loading, Footer } from '../../components'
import { WithQglQuery } from '../../hooks'
import FieldView from './field-view'
import Header from './header'
import CodeView from './code-view'

export default ({ id }) => {
  const [codeView, updateCodeView] = useState(false)

  return (
    <WithQglQuery
      QUERY={gql`
        query catalogue($ids: [ID!]) {
          catalogue {
            records(ids: $ids) {
              nodes {
                target
              }
            }
          }
        }
      `}
      variables={{ ids: [id] }}
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
              {...data?.catalogue?.records?.nodes?.[0]?.target?._source}
            />
            {codeView ? (
              <CodeView
                codeView={codeView}
                json={data?.catalogue?.records?.nodes?.[0]?.target?._source}
              />
            ) : (
              <FieldView
                codeView={codeView}
                {...data?.catalogue?.records?.nodes?.[0]?.target?._source}
              />
            )}
            <Footer />
          </>
        )
      }}
    </WithQglQuery>
  )
}
