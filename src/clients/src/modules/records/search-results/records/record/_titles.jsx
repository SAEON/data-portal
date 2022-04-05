import { useContext } from 'react'
import { context as configContext } from '../../../../../config'
import { useHistory } from 'react-router-dom'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import useTheme from '@mui/material/styles/useTheme'

export default ({ titles, id }) => {
  const theme = useTheme()
  const { contentBase } = useContext(configContext)
  const history = useHistory()

  return (
    <header>
      <CardContent
        sx={{
          paddingBottom: 0,
        }}
      >
        <Typography
          tabIndex="0"
          component={Link}
          onClick={() => history.push(`${contentBase}/records/${id}`.replace('//', '/'))}
          sx={{
            lineHeight: 1.5,
            cursor: 'pointer',
            display: 'block',
            textAlign: 'center',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.08333em',
            textTransform: 'uppercase',
            color: theme.palette.text.primary,
          }}
          variant="h2"
        >
          {titles?.[0]?.title || 'Title missing'}
        </Typography>
      </CardContent>
    </header>
  )
}
