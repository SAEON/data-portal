import React from 'react'
import { Gesture as GestureIcon } from '@material-ui/icons'
import { PolygonSelectionTool } from '../../../map-tools'
import { Grid, Button } from '@material-ui/core'
import { MenuContext } from '../../../../../provider-menu'

export default ({ updateForm, ...fields }) => {
  return (
    <MenuContext.Consumer>
      {({ addMenu, removeMenu, getMenuById, getActiveMenuZIndex }) => {
        return (
          <Grid item xs={12}>
            <Button
              color="default"
              disableElevation
              size="small"
              onClick={() => {
                const id = 'map-selection-tools'
                if (getMenuById(id)) {
                  removeMenu(id)
                } else {
                  addMenu({
                    id,
                    zIndex: getActiveMenuZIndex(),
                    Component: () => (
                      <PolygonSelectionTool
                        onDrawEnd={(geometry) =>
                          updateForm({ extents: [...fields.extents, geometry] })
                        }
                        id={id}
                        onClose={() => removeMenu(id)}
                      />
                    ),
                  })
                }
              }}
              variant="outlined"
              startIcon={<GestureIcon />}
            >
              Select area
            </Button>
          </Grid>
        )
      }}
    </MenuContext.Consumer>
  )
}
