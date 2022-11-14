var timer
export default (cb, duration = 0) =>
  (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => cb(...args), duration)
  }
