import React from 'react'
import { Fab } from '@material-ui/core'
import { Print as PrintIcon } from '@material-ui/icons'
import { DragMenu } from '../../components'
import { MenuContext } from '../../modules/menu-provider'
import html2canvas from 'html2canvas'

export default () => {
  const options = { width: 500, height: 500 }
  const takeScreenshot = () => {
    let screenshot = (
      <div id="somediv">
        <p>loading..</p>
        <button>test</button>
      </div>
    )

    //taking canvas of document.body
    html2canvas(document.body, options).then(function (canvas) {
      console.log('then canvas', canvas)
      document.getElementById('somediv').appendChild(canvas)
    })
    return screenshot
  }
  return (
    <MenuContext.Consumer>
      {({ updateMenuManager, setActiveMenu, getMenuById }) => {
        const screenshotMenu = getMenuById('screenshotMenu')
        return (
          <>
            <Fab
              size="small"
              color="primary"
              style={{ position: 'absolute', right: 20, bottom: 70, zIndex: 1 }}
              aria-label="toggle menu"
              onClick={() =>
                updateMenuManager({ screenshotMenu: { active: !screenshotMenu.active } })
              }
            >
              <PrintIcon />
            </Fab>
            <DragMenu
              id="somedragmenu"
              onMouseDown={() => setActiveMenu('screenshotMenu')}
              zIndex={screenshotMenu.zIndex}
              title={'Screenshot'}
              active={screenshotMenu.active}
              close={() => updateMenuManager({ screenshotMenu: { active: false } })}
            >
              {takeScreenshot}
            </DragMenu>
          </>
        )
      }}
    </MenuContext.Consumer>
  )
}
