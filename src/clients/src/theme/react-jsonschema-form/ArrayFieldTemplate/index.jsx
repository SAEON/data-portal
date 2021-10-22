import { utils } from '@rjsf/core'
import {
  DefaultFixedArrayFieldTemplate,
  DefaultNormalArrayFieldTemplate,
} from './array-field-template'
const { isMultiSelect, getDefaultRegistry } = utils

export default props => {
  const { schema, registry = getDefaultRegistry() } = props

  if (isMultiSelect(schema, registry['rootSchema'])) {
    return <DefaultFixedArrayFieldTemplate {...props} />
  } else {
    return <DefaultNormalArrayFieldTemplate {...props} />
  }
}
