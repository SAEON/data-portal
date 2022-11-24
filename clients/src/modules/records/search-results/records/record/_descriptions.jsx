import Typography from '@mui/material/Typography'

export default ({ descriptions }) => {
  return (
    <Typography
      sx={{
        color: theme => theme.palette.text.primary,
        fontSize: '0.775rem',
        mb: theme => theme.spacing(1),
        mx: theme => theme.spacing(2),
        overflow: 'hidden',
        textAlign: 'justify',
        textOverflow: 'ellipsis',
        whiteSpace: 'break-spaces',
        wordBreak: 'break-word',
      }}
      variant="body2"
    >
      {descriptions?.[0]?.description?.truncate(500).replace(/\s+/g, ' ') || 'No description'}
    </Typography>
  )
}
