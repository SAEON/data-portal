import React from 'react'
import { OpenLayers } from './open-layers'

// Export the OpenLayers API
export * from './open-layers'

// The custom Modules
export { default as SingleFeatureSelector } from './modules/single-feature-selector'
export { default as LayerManager } from './modules/layer-manager'

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
