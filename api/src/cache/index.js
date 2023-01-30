const cache = {}

export const clearCache = key => {
  cache[key] = null
}

export const setCache = (key, value) => {
  cache[key] = value
}

export default cache
