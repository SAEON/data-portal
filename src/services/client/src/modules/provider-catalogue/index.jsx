import React, { createContext } from 'react'
import { gql } from '@apollo/client'
import { GqlDataQuery } from '../../components'

export const CatalogueContext = createContext()

const SUBJECT = 'metadata_json.subjects.subject.raw'

export default ({ children }) => {
  return (
    <GqlDataQuery
      query={gql`
        query catalogue($fields: [String!]) {
          catalogue {
            id
            summary(fields: $fields)
          }
        }
      `}
      variables={{ fields: [SUBJECT] }}
    >
      {({ catalogue }) => {
        return (
          <CatalogueContext.Provider
            value={{ themes: catalogue.summary[0][SUBJECT].map(({ key }) => key).filter(_ => _) }}
          >
            {children}
          </CatalogueContext.Provider>
        )
      }}
    </GqlDataQuery>
  )
}
