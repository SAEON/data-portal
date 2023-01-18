import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import FlatPage from '../../components/flat-page'
import { PACKAGE_DESCRIPTION } from '../../config'
import { alpha } from '@mui/material/styles'

export default () => {
  return (
    <>
      <FlatPage>
        <Card
          sx={theme => ({
            backgroundColor: alpha(theme.palette.common.white, 0.9),
            my: 2,
          })}
          variant="outlined"
        >
          <CardHeader sx={{ textAlign: 'center' }} title="About" />

          <CardContent>
            <Typography
              sx={{
                mb: 2,
              }}
              variant="body2"
            >
              {PACKAGE_DESCRIPTION}
            </Typography>
          </CardContent>
        </Card>
      </FlatPage>
    </>
  )
}
