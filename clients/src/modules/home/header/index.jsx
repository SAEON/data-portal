import Header from '../../../components/toolbar-header'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { Div } from '../../../components/html-tags'
import { DatabasePlus as SubmitIcon, Magnify as SearchIcon } from '../../../components/icons'
import Tooltip from '@mui/material/Tooltip'

export default () => {
  return (
    <Header>
      <Divider flexItem orientation="vertical" />
      <Div sx={{ mx: theme => theme.spacing(1) }} />
      <Tooltip placement="top-start" title="Submit data for curation">
        <Button
          href="https://saeon.ac.za/data-curation/"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<SearchIcon fontSize="small" />}
          size="small"
          variant="text"
        >
          Search data
        </Button>
      </Tooltip>
      <Divider sx={{ mx: theme => theme.spacing(1) }} flexItem orientation="vertical" />
      <Tooltip placement="top-start" title="Submit data for curation">
        <Button
          href="https://saeon.ac.za/data-curation/"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<SubmitIcon fontSize="small" />}
          size="small"
          variant="text"
        >
          Submit data
        </Button>
      </Tooltip>
      <Div sx={{ mr: theme => theme.spacing(1) }} />
    </Header>
  )
}
