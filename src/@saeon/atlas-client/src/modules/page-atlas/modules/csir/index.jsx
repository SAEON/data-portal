import React from 'react'
import Esri from '../esri'
import layers from './layers'
import { ATLAS_API_ADDRESS } from '../../../../config'

const PROXY_ADDRESS = `${ATLAS_API_ADDRESS}/proxy/csir`
const SERVICES_ADDRESS = 'https://pta-gis-2-web1.csir.co.za/server2/rest/services'

export default () => (
  <Esri servicesAddress={SERVICES_ADDRESS} layers={layers} apiProxyAddress={PROXY_ADDRESS} />
)
