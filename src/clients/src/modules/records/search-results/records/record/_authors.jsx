import Typography from '@mui/material/Typography'

export default ({ sx, creators }) => {
  return (
    <Typography variant="overline" sx={sx}>
      {creators?.map(({ name }) => name).join(', ') || 'Creator info missing'}
    </Typography>
  )
}
