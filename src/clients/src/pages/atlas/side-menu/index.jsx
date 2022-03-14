import { createContext, useState } from 'react'
import { useMenu } from '../../../packages/snap-menus'
import Tabs from './tabs'

export const SideMenuContext = createContext()
export const TabsContext = createContext()

const TabContextProvider = ({ children }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  return (
    <TabsContext.Provider value={{ activeTabIndex, setActiveTabIndex }}>
      {children}
    </TabsContext.Provider>
  )
}

export default ({ snapMenusContainer }) => {
  const RecordsMenu = useMenu({ id: 'records' })
  const LegendMenu = useMenu({ id: 'legend' })
  const DataMenu = useMenu({ id: 'data' })

  return (
    <RecordsMenu
      defaultHeight={snapMenusContainer.current?.offsetHeight}
      defaultWidth={300}
      defaultPosition={{ x: 0, y: 0 }}
      draggable={false}
      resizable={false}
      open={true}
      opacity={1}
      title={'Data Explorer'}
    >
      {({ width, height }) => {
        return (
          <SideMenuContext.Provider value={{ width, height }}>
            <TabContextProvider>
              <div style={{ height: '100%' }}>
                <Tabs DataMenu={DataMenu} LegendMenu={LegendMenu} />
              </div>
            </TabContextProvider>
          </SideMenuContext.Provider>
        )
      }}
    </RecordsMenu>
  )
}
