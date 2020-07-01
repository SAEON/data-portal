export default (cb, duration = 0) => {
  var timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => cb(...args), duration)
  }
}
