import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const Text_ = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
}))

const Title = props => <Text_ textAlign="center" variant={'overline'} {...props} />

const Item = ({ sx = {}, ...props }) => (
  <Grid
    sx={{
      my: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      ...sx,
    }}
    item
    xs={12}
    sm={6}
    md={2}
    {...props}
  />
)

export default ({ Icon, title, content }) => {
  return (
    <Item>
      <Icon
        sx={{
          color: theme => theme.palette.common.white,
        }}
        fontSize="large"
      />
      <Title>
        {title} {content}
      </Title>
    </Item>
  )
}
