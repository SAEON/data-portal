import { forwardRef } from 'react'
import { Div } from '../../../components/html-tags'
import { alpha, styled } from '@mui/material/styles'
import { Database as DatabaseIcon } from '../../../components/icons'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

const Item = ({ sx = {}, ...props }) => (
  <Grid
    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...sx }}
    item
    xs={12}
    sm={6}
    md={4}
    {...props}
  />
)

const Text_ = styled(Typography)(({ theme }) => ({
  color: alpha(theme.palette.primary.main, 0.9),
}))

const Title = props => (
  <Text_ textAlign="center" fontSize="2rem" lineHeight={2} variant={'overline'} {...props} />
)

const Content = props => (
  <Text_
    flexGrow={1}
    marginBottom={theme => theme.spacing(6)}
    textAlign="left"
    variant="h6"
    variantMapping={{
      h6: 'h3',
    }}
    {...props}
  />
)

export default forwardRef((props, ref) => {
  return (
    <Div
      ref={ref}
      sx={{
        backgroundColor: theme => alpha(theme.palette.common.white, 0.8),
      }}
    >
      <Container sx={{ py: 4 }}>
        <Grid container spacing={2}>
          <Item>
            <DatabaseIcon
              sx={{
                color: theme => alpha(theme.palette.primary.main, 0.9),
                mt: 3,
                fontSize: '8rem',
              }}
            />
            <Title>3097</Title>
            <Content>Curated metadata records</Content>
          </Item>
        </Grid>
      </Container>
    </Div>
  )
})
