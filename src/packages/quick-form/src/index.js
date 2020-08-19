import { useState, useEffect } from 'react'

export default ({ children, effects, ...formFields }) => {
  const [fields, updateAllFields] = useState(formFields)

  useEffect(
    () =>
      effects?.forEach(effect => {
        effect(fields)
      }),
    [fields, effects]
  )

  const updateForm = obj => {
    updateAllFields(Object.assign({ ...fields }, obj))
  }

  return children({
    updateForm,
    ...fields,
  })
}
