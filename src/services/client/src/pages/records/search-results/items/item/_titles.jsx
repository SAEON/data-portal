import { useHistory } from 'react-router-dom'
import { CardContent, Typography, Link as MuiLink } from '@material-ui/core'

export default ({ titles, id }) => {
  const history = useHistory()
  return (
    <CardContent>
      <Typography
        component={MuiLink}
        onClick={() => history.push(`/records/${id}`)}
        style={{
          cursor: 'pointer',
        }}
        variant="h6"
      >
        {titles?.[0]?.title || 'Title missing'}
      </Typography>
    </CardContent>
  )
}
