import React from 'react'
import { createPortal } from 'react-dom'
import { Gesture as GestureIcon } from '@material-ui/icons'
import { PolygonSelectionTool } from '../../page-atlas/modules/map-tools'
import { Grid, Button } from '@material-ui/core'
import { MenuContext } from '@saeon/snap-menus'

const id = 'map-selection-tools'

export default ({ updateForm, ...fields }) => {
  return (
    <MenuContext.Consumer>
      {({ addMenu, removeMenu, getMenuById, menus, menuContainerEl, container }) => {
        return (
          <>
            {/* Render the mapTools menu if necessary */}
            {menus
              ?.filter(menu => menu.id === id)
              ?.map(menu =>
                createPortal(
                  <menu.Component updateForm={updateForm} {...fields} />,
                  menuContainerEl
                )
              ) || null}

            <Grid item xs={12}>
              <Button
                fullWidth
                color="secondary"
                variant="contained"
                disableElevation
                size="small"
                onClick={() => {
                  if (getMenuById(id)) {
                    removeMenu(id)
                  } else {
                    addMenu({
                      id,
                      norender: true,
                      Component: ({ updateForm, ...fields }) => (
                        <PolygonSelectionTool
                          onDrawEnd={polygon =>
                            updateForm({ polygons: [...fields.polygons, polygon] })
                          }
                          container={container}
                          id={id}
                          onClose={() => removeMenu(id)}
                        />
                      ),
                    })
                  }
                }}
                startIcon={<GestureIcon />}
              >
                Select area
              </Button>
            </Grid>
          </>
        )
      }}
    </MenuContext.Consumer>
  )
}
