import React, { createContext } from 'react'
import { gql } from '@apollo/client'
import { GqlDataQuery } from '../../components'

export const CatalogueContext = createContext()

export default ({ children }) => {
  return (
    <GqlDataQuery
      query={gql`
        query catalogueThemes {
          catalogueThemes {
            key
            doc_count
          }
        }
      `}
    >
      {({ catalogueThemes }) => {
        return (
          <CatalogueContext.Provider
            value={{ themes: catalogueThemes.map(({ key }) => key).filter(_ => _) }}
          >
            {children}
          </CatalogueContext.Provider>
        )
      }}
    </GqlDataQuery>
  )
}
