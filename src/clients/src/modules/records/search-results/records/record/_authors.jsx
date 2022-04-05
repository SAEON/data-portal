import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'

export default ({ creators }) => {
  const theme = useTheme()

  return (
    <CardContent
      sx={{
        paddingTop: theme.spacing(1)
      }}
    >
      <Typography
        sx={{
          lineHeight: 1.5,
          display: 'block',
          textAlign: 'center'
        }}
        variant="overline"
      >
        {creators?.map(({ name }) => name).join(', ') || 'Creator info missing'}
      </Typography>
    </CardContent>
  )
}
