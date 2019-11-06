import React from 'react'
import { OpenLayers } from './open-layers'

// Export the OpenLayers API
export * from './open-layers'

// The custom Modoles
export { default as SingleFeatureSelector } from './modules/single-feature-selector'
export { default as LayerSwitcher } from './modules/layer-switcher'

// Export the Map object
export const Map = ({ layers, children, viewOptions, style, className }) => (
  <OpenLayers
    style={style}
    className={className}
    viewOptions={viewOptions}
    layers={layers}
    children={children ? ({ map }) => children({ map }) : null}
  />
)
