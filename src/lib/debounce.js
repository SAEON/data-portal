/**
 * Only the last function call is executed within a given time period
 */
let timer
export default (cb, duration = 0) => (...args) => {
  clearTimeout(timer)
  timer = setTimeout(() => cb(...args), duration)
}
