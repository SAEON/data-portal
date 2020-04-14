import React from 'react'
import Esri from '../esri'
import layers from './layers'
import { ATLAS_API_ADDRESS } from '../../config'

const PROXY_ADDRESS = `${ATLAS_API_ADDRESS}/proxy/hst`
const SERVICES_ADDRESS = 'https://gisportal.saeon.ac.za/server/rest/services'

export default () => (
  <Esri servicesAddress={SERVICES_ADDRESS} layers={layers} proxy={PROXY_ADDRESS} />
)
