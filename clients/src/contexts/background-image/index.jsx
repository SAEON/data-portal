import { createContext } from 'react'
import { CATALOGUE_CLIENT_BACKGROUNDS } from '../../config'
import { Div } from '../../components/html-tags'

/**
 * Provides some measure of control over which background
 * image is displayed throughout the application. This
 * is not yet fully implemented - current the background
 * is chosen at random.
 */

const getBackgroundImagePath = () => {
  const backgrounds = CATALOGUE_CLIENT_BACKGROUNDS.split(',')
  const min = 0
  const max = backgrounds.length - 1
  const i = Math.floor(Math.random() * (max - min + 1) + min)
  return { name: backgrounds[i], url: `url(/bg/${backgrounds[i]})` }
}

export const context = createContext()

export default ({ children }) => {
  const image = getBackgroundImagePath()
  return (
    <context.Provider value={{ image }}>
      <Div
        id="bg"
        sx={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundSize: 'cover',
          backgroundImage: image.url,
          zIndex: -1,
        }}
      />

      {children}
    </context.Provider>
  )
}
