import { useContext } from 'react'
import { context as configContext } from '../../../../../config'
import { useNavigate, useLocation } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { Header } from '../../../../../components/html-tags'
import { alpha } from '@mui/material/styles'

export default ({ titles, id, doi }) => {
  const { contentBase } = useContext(configContext)
  const { search } = useLocation()
  const navigate = useNavigate()

  return (
    <Header>
      <Typography
        tabIndex="0"
        onClick={() => navigate(`${contentBase}/records/${doi || id}${search}`.replace('//', '/'))}
        sx={{
          color: theme => theme.palette.text.primary,
          cursor: 'pointer',
          display: 'block',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.08333em',
          lineHeight: 1.5,
          mb: theme => theme.spacing(2),
          ml: theme => theme.spacing(2),
          mr: theme => theme.spacing(4),
          mt: theme => theme.spacing(2),
          textAlign: 'left',
          textDecoration: theme => `none 0.15em ${alpha(theme.palette.primary.main, 0)}`,
          textTransform: 'uppercase',
          textUnderlineOffset: '0.25em',
          transition: theme =>
            theme.transitions.create(['text-decoration-color'], {
              duration: theme.transitions.duration.shorter,
            }),
          '&:hover': {
            textDecoration: theme => `underline 0.15em ${alpha(theme.palette.primary.main, 1)}`,
          },
        }}
        variant="h3"
      >
        {titles?.[0]?.title || 'Title missing'}
      </Typography>
    </Header>
  )
}
