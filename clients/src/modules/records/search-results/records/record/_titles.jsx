import { useContext } from 'react'
import { context as configContext } from '../../../../../config'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Header } from '../../../../../components/html-tags'

export default ({ titles, id }) => {
  const { contentBase } = useContext(configContext)
  const navigate = useNavigate()

  return (
    <Header>
      <Typography
        tabIndex="0"
        component={Link}
        onClick={() => navigate(`${contentBase}/records/${id}`.replace('//', '/'))}
        sx={{
          lineHeight: 1.5,
          cursor: 'pointer',
          display: 'block',
          textAlign: 'left',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.08333em',
          textTransform: 'uppercase',
          color: theme => theme.palette.text.primary,
          mt: theme => theme.spacing(2),
          mr: theme => theme.spacing(4),
          mb: theme => theme.spacing(2),
          ml: theme => theme.spacing(2),
        }}
        variant="h2"
      >
        {titles?.[0]?.title || 'Title missing'}
      </Typography>
    </Header>
  )
}
