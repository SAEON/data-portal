import Toolbar_ from './toolbar'
import Typography from '@mui/material/Typography'

export const Toolbar = Toolbar_

export default ({ description, ...props }) => {
  return (
    <Toolbar_
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
      {...props}
    >
      <Typography
        variant="h6"
        variantMapping={{
          h6: 'h2',
        }}
        sx={theme => ({
          fontSize: '0.8rem',
          textAlign: 'center',
          [theme.breakpoints.up('md')]: {
            fontSize: 'unset',
          },
        })}
      >
        {description}
      </Typography>
    </Toolbar_>
  )
}
