import { useState, useContext, forwardRef } from 'react'
import { createPortal } from 'react-dom'
import { context as databookContext } from '../../../context'
import TabHeaders from './_tab-headers'
import Filter from './filter'
import { Fade } from '@material-ui/core'

export default forwardRef((props, ref) => {
  const { databook, filters } = useContext(databookContext) //eventually changed to databook.filters
  console.log('databook', databook)
  const [activeTabIndex, setActiveTabIndex] = useState(filters.length - 1 || 0)

  return (
    <>
      {createPortal(
        <TabHeaders
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
          charts={filters}
        />,
        ref.current
      )}
      {filters.map((filter, i) => {
        return (
          <Fade in={activeTabIndex === i} key={filter.id}>
            <div style={{ height: '100%' }} role="tabpanel" hidden={activeTabIndex !== i}>
              {activeTabIndex === i && (
                <Filter
                  activeTabIndex={activeTabIndex}
                  setActiveTabIndex={setActiveTabIndex}
                  filter={filter}
                />
              )}
            </div>
          </Fade>
        )
      })}
    </>
  )
})
