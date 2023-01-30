import Typography from '@mui/material/Typography'
import FlatPage from '../../components/flat-page'
import { PACKAGE_DESCRIPTION } from '../../config'

export default () => {
  return (
    <FlatPage title="About the data portal">
      <Typography
        sx={{
          color: theme => theme.palette.common.white,
        }}
        variant="body1"
      >
        {PACKAGE_DESCRIPTION}
      </Typography>
    </FlatPage>
  )
}
