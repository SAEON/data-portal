import { styled } from '@mui/material/styles'

const Styled = styled('a')(({ theme }) => ({
  position: 'absolute',
  zIndex: 5000,
  top: -400,
  background: theme.palette.common.black,
  color: theme.palette.common.white,
  padding: theme.spacing(2),
  '&:focus': {
    top: 0,
  },
}))

export default ({ href, text }) => <Styled href={href}>{text}</Styled>
