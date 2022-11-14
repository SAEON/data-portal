import { useState, useRef, useEffect } from 'react'

const ONE_SECOND = 1000

export default () => {
  const [seconds, setSeconds] = useState(0)
  const interval = useRef()

  if (!interval.current) {
    interval.current = setInterval(() => {
      setSeconds(i => i + 1)
    }, ONE_SECOND)
  }

  useEffect(() => () => clearInterval(interval.current), [])

  return new Date(seconds * 1000).toISOString().substr(11, 8)
}
