import React from 'react'
import Esri from '../esri'
import layers from './layers'
import { ATLAS_API_ADDRESS } from '../../config'

const PROXY_ADDRESS = `${ATLAS_API_ADDRESS}/proxy/hst`

export default () => (
  <Esri
    servicesAddress="https://gisportal.saeon.ac.za/server/rest/services"
    layers={layers}
    proxy={PROXY_ADDRESS}
  />
)
