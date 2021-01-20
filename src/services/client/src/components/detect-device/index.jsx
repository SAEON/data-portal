import { isIE } from 'react-device-detect'

export default ({ children }) => {
  if (isIE) {
    throw new Error(
      'Browser version is not supported.\n\nWe do not currently support Internet Explorer. If this is required, please provide feedback and we will address this to the extent possible. IE 11 is an old browser with several limitations, some that we cannot overcome. Using a new browser will certainly be a more pleasant application experience'
    )
  }

  return children
}
