import React from 'react'
import { Grid } from '@material-ui/core'
import { Form } from '../../../components'
import { MapContext } from '../../provider-map'
import Selector from './selector'

export default ({ updateForm: updateMainForm, ...fields }) => {
  return (
    <>
      <Grid item xs={12}>
        <Form selectPolygonActive={false} selectRectActive={false}>
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
        </Form>
      </Grid>
    </>
  )
}
