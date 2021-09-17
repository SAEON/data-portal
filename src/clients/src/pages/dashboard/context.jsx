import { useState, createContext } from 'react'

export const context = createContext()

export default props => {
  const { children, filterIds } = props

  const initialContextFilters = {}
  for (var i = 0; i < filterIds.length; i++) {
    initialContextFilters[filterIds[i]] = { selectedValues: [] }
  }
  const [selectedFilters, setSelectedFilters] = useState(initialContextFilters)
  return (
    <context.Provider
      value={{
        selectedFilters,
        setSelectedFilters,
        filterIds,
      }}
    >
      {children}
    </context.Provider>
  )
}
