import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export default ({ descriptions }) => {
  return (
    <CardContent>
      <Typography
        sx={{
          color: theme => theme.palette.text.primary,
          fontSize: '0.8rem',
          lineHeight: 1.5,
          textAlign: 'justify',
          whiteSpace: 'break-spaces',
          wordBreak: 'break-word',
          lineClamp: 3,
          boxOrient: 'vertical',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          display: '-webkit-box'
        }}
        variant="body2"
      >
        {descriptions?.[0]?.description?.truncate(530) || 'No description'}
      </Typography>
    </CardContent>
  )
}
