import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { alpha, styled } from '@mui/material/styles'

const Text_ = styled(Typography)(({ theme }) => ({
  color: alpha(theme.palette.common.white, 0.9),
}))

const Title = props => <Text_ textAlign="center" variant={'overline'} {...props} />

const Item = ({ sx = {}, ...props }) => (
  <Grid
    sx={theme => ({
      my: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      ...sx,
    })}
    item
    xs={6}
    md={2}
    {...props}
  />
)

export default ({ Icon, title, content }) => {
  return (
    <Item>
      <Icon
        sx={{
          color: theme => alpha(theme.palette.common.white, 0.9),
        }}
        fontSize="large"
      />
      <Title>
        {title} {content}
      </Title>
    </Item>
  )
}
