import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export default ({ children }) => {
  return <Container>{children}</Container>
}

export const H = props => (
  <Typography
    sx={theme => ({
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2)
    })}
    variant="h6"
    {...props}
  />
)

export const P = props => (
  <Typography
    sx={theme => ({
      marginBottom: theme.spacing(2)
    })}
    variant="body2"
    {...props}
  />
)
