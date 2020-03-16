import React, { createContext, useState } from 'react'
import { DragMenu } from '../../components'

export const MenuContext = createContext()

export const MenuManager = ({ children }) => {
  const [state, setState] = useState({
    topMenu: { menuAnchor: null },
    configMenu: { active: false, zIndex: 1 },
    layersMenu: { active: false, zIndex: 1 },
    layerInfo: { active: false, zIndex: 1 },
    saeonSearchMenu: { active: false, zIndex: 1 },
    csirSearchMenu: { active: false }
  })

  const setActiveMenu = id => {
    const newState = { ...state }
    newState[id].zIndex = Math.max(...Object.entries(state).map(([, v]) => (v?.zIndex || 0) + 1))
    setState(newState)
  }

  const updateMenuManager = obj => {
    const newState = { ...state }
    Object.entries(obj).forEach(([k, v]) => (newState[k] = Object.assign(state[k], v)))
    setState(newState)
  }

  return (
    <MenuContext.Provider
      value={{
        ...state,
        setActiveMenu,
        updateMenuManager
      }}
    >
      {/* TODO - Render menus here */}
      <DragMenu
        onMouseDown={() => setActiveMenu('layerInfo')}
        zIndex={state.layerInfo.zIndex}
        defaultPosition={{ x: 650, y: 25 }}
        width={200}
        title={'Layer info'}
        active={state.layerInfo.active}
        close={() => updateMenuManager({ layerInfo: { active: false } })}
      >
        hi
      </DragMenu>

      {children}
    </MenuContext.Provider>
  )
}
