import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import { Cancel as Icon } from '../icons'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { alpha } from '@mui/material/styles'

export default ({ requiredPermission = 'NA' }) => {
  return (
    <Container>
      <Card
        variant="outlined"
        sx={{ backgroundColor: theme => alpha(theme.palette.common.white, 0.9) }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{
                width: theme => theme.spacing(4),
                height: theme => theme.spacing(4),
                backgroundColor: theme => theme.palette.primary.main,
              }}
            >
              <Icon fontSize="large" />
            </Avatar>
          }
          title={<Typography variant="h4">No Access</Typography>}
        />
        <CardContent>
          You do not have sufficient access rights to view this resource (required permission:{' '}
          {requiredPermission}). Please contact a system administrator if you need access to this
          resource
        </CardContent>
      </Card>
    </Container>
  )
}
