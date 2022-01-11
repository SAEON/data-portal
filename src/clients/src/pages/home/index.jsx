import SkipLink from '../../components/skip-link'
import Search from './search'
import { alpha, styled } from '@mui/material/styles'

const StyledDiv = styled('div')(({ theme }) => ({
  height: '10vh',
  backgroundColor: alpha(theme.palette.common.black, 0.4),
}))

export default () => {
  return (
    <>
      <SkipLink href="#home-search" text="Skip to main content" />
      <Search />
      <StyledDiv />
    </>
  )
}
