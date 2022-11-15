import Typography from '@mui/material/Typography'
import { Header, Div } from '../../../../components/html-tags'

export default ({ catalogue, ...props }) => {
  return (
    <Header>
      <Typography component={Div} variant="overline" noWrap {...props}>
        {catalogue?.search ? `${catalogue.search.totalCount}` : '...'} Results
      </Typography>
    </Header>
  )
}
