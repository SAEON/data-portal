import React from 'react'
import { OpenLayers } from './open-layers'

// Export the OpenLayers API
export * from './open-layers'

// UI Exports (Not the right place for these)
export { default as SideMenu } from './ui/side-menu'
export { default as DropdownSelect } from './ui/dropdown-select'
export { default as FeaturePanel } from './ui/feature-panel'

// The Map API
export { default as FeatureSelector } from './modules/feature-selector'

export const Map = ({ layers, children, viewOptions, style, className }) => (
  <OpenLayers
    style={style}
    className={className}
    viewOptions={viewOptions}
    layers={layers}
    children={children ? ({ map }) => children({ map }) : null}
  />
)
