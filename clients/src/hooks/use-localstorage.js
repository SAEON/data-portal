import { useState } from 'react'

export default (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error) // TODO - not sure why this would error
      return initialValue
    }
  })

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error) // TODO - not sure why this would error
    }
  }

  return [storedValue, setValue]
}
