import { Avatar } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

export default ({ userInfo, style }) => {
  const theme = useTheme()
  const { google = undefined, twitter = undefined } = userInfo
  const uri = google?.picture || twitter?.profile_image_url_https || undefined

  return (
    <Avatar
      style={Object.assign({ height: theme.spacing(4), width: theme.spacing(4) }, style)}
      src={uri}
    />
  )
}
