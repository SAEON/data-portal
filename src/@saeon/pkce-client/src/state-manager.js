export const CACHE_KEYS = {
  PKCE_STATE: 'PKCE_STATE',
  APPLICATION_STATE: 'APPLICATION_STATE',
}

export const setState = (key, value) => localStorage.setItem(key, value)

export const getState = key => localStorage.getItem(key)

export const clearState = () => Object.keys(CACHE_KEYS).forEach(key => localStorage.removeItem(key))
