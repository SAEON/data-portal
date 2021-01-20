import { createContext } from 'react'
import { CATALOGUE_CLIENT_BACKGROUNDS } from '../config'
import { getUriState } from '../lib/fns'
import { Typography } from '@material-ui/core'
import { useTheme, fade } from '@material-ui/core/styles'
import { isTablet, isMobile } from 'react-device-detect'

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
  return `url(/bg/${backgrounds[i]})`
}

export const BgImageContext = createContext()

export default ({ children }) => {
  const theme = useTheme()
  const { disableBackground = false } = getUriState()

  if (disableBackground === 'true') {
    return children
  }

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
      {!isMobile && !isTablet && (
        <Typography
          variant="overline"
          style={{
            fontSize: 8,
            backgroundColor: fade(theme.palette.common.black, 0.5),
            color: theme.palette.grey[200],
            position: 'fixed',
            bottom: theme.spacing(1),
            right: theme.spacing(1),
            borderRadius: theme.shape.borderRadius,
            padding: theme.spacing(1),
            lineHeight: '8px',
          }}
        >
          Images from unsplash.com
        </Typography>
      )}

      {children}
    </>
  )
}
