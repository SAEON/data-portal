import { useState, useEffect, useRef, createRef } from 'react'

export default ({ children, effects, ...formFields }) => {
  const [fields, updateAllFields] = useState(formFields)
  const refs = useRef({})

  /**
   * Register effects on first render
   */
  if (effects && !Object.keys(refs.current).length) {
    effects.forEach((effect, i) => {
      if (!refs.current[i]) {
        const ref = createRef()
        ref.current = effect
        refs.current[i] = ref.current
      }
    })
  }

  useEffect(
    () =>
      Object.entries(refs?.current)?.forEach(([, effect]) => {
        effect(fields)
      }),
    [fields]
  )

  const updateForm = obj => {
    updateAllFields(Object.assign({ ...fields }, obj))
  }

  return children(updateForm, {
    ...fields,
  })
}
