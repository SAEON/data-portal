import { useState, useEffect } from 'react'

export default ({ children, effects, ...formFields }) => {
  const [fields, updateAllFields] = useState(formFields)

  useEffect(
    () =>
      effects?.forEach(effect => {
        effect(fields)
      }),
    [fields] // TODO - The suggested fix by eslint breaks the code - a better approach is in the nccs code component
  )

  const updateForm = obj => {
    updateAllFields(Object.assign({ ...fields }, obj))
  }

  return children(updateForm, {
    ...fields,
  })
}
