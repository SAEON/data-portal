var cache = {}

export const set = id => (cache[id] = true)
export const rm = id => delete cache[id]
export const get = id => cache[id]
