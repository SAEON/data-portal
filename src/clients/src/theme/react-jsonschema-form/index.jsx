import ArrayFieldTemplate from './ArrayFieldTemplate'
import ErrorList from './ErrorList'
import Fields from './Fields'
import FieldTemplate from './FieldTemplate'
import ObjectFieldTemplate from './ObjectFieldTemplate'
import Widgets from './Widgets'

import { utils } from '@rjsf/core'
const { getDefaultRegistry } = utils

const { fields, widgets } = getDefaultRegistry()

const DefaultChildren = () => null

const Theme = {
  children: <DefaultChildren />,
  ArrayFieldTemplate,
  fields: { ...fields, ...Fields },
  FieldTemplate,
  ObjectFieldTemplate,
  widgets: { ...widgets, ...Widgets },
  ErrorList,
}

export default Theme
