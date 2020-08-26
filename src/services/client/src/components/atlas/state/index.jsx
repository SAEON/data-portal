import React, { createContext } from 'react'

export const AtlasContext = createContext()

export default ({ children, gqlData, doiMap }) => {
  return <AtlasContext.Provider value={{ gqlData }}>{children}</AtlasContext.Provider>
}
