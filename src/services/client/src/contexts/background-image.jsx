/**
 * Provides some measure of control over which background
 * image is displayed throughout the application. This
 * is not yet fully implemented - current the background
 * is chosen at random.
 */

import React, { createContext } from 'react'
import { BACKGROUNDS } from '../config'

const getBackgroundImagePath = () => {
  const backgrounds = BACKGROUNDS.split(',')
  const min = 0
  const max = backgrounds.length - 1
  const i = Math.floor(Math.random() * (max - min + 1) + min)
  return `url(/bg/${backgrounds[i]})`
}

export const BgImageContext = createContext()

export default ({ children }) => {
  return (
    <>
      <div
        id="bg"
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundSize: 'cover',
          backgroundImage: getBackgroundImagePath(),
          zIndex: -1,
        }}
      />
      {children}
    </>
  )
}
