import React from 'react'
import { Grid } from '@material-ui/core'
import QuickForm from '@saeon/quick-form'
import { MapContext } from '../../../../../../modules/provider-map'
import Selector from './selector'

export default ({ updateForm: updateMainForm, ...fields }) => {
  return (
    <>
      <Grid item xs={12}>
        <QuickForm selectPolygonActive={false} selectRectActive={false}>
          {({ updateForm, selectPolygonActive, selectRectActive }) => (
            <MapContext.Consumer>
              {({ proxy }) => {
                return (
                  <Selector
                    updateForm={updateForm}
                    selectPolygonActive={selectPolygonActive}
                    selectRectActive={selectRectActive}
                    proxy={proxy}
                    onDrawEnd={polygon =>
                      updateMainForm({ polygons: [...fields.polygons, polygon] })
                    }
                  />
                )
              }}
            </MapContext.Consumer>
          )}
        </QuickForm>
      </Grid>
    </>
  )
}
