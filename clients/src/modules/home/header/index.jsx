import Header from '../../../components/toolbar-header'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { Div } from '../../../components/html-tags'
import SubmitIcon from 'mdi-react/DatabasePlusIcon'
import Tooltip from '@mui/material/Tooltip'

export default () => {
  return (
    <Header>
      <Divider flexItem orientation="vertical" />
      <Div sx={{ mr: theme => theme.spacing(1) }} />
      <Tooltip placement="top-start" title="Submit data for curation">
        <Button
          href="https://saeon.ac.za/data-curation/"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<SubmitIcon size={18} />}
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
