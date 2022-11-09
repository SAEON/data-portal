import Typography from '@mui/material/Typography'

export default ({ descriptions }) => {
  return (
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
        display: '-webkit-box',
        mx: theme => theme.spacing(2),
        mb: theme => theme.spacing(1),
      }}
      variant="body2"
    >
      {descriptions?.[0]?.description?.truncate(250).replace(/\s+/g, ' ') || 'No description'}
    </Typography>
  )
}
