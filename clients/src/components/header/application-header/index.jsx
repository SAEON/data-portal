import Toolbar_ from './toolbar'
import Authentication from './authentication'
import NavigationMenu from './navigation-menu'
import Hidden from '@mui/material/Hidden'
import Divider from '@mui/material/Divider'
import Breadcrumbs from './breadcrumbs'
import { Div } from '../../html-tags'
export { default as TitleHeader } from './title-header'
import Button from '@mui/material/Button'
import { DatabasePlus as SubmitIcon } from '../../../components/icons'
import useMediaQuery from '@mui/material/useMediaQuery'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

export const Toolbar = Toolbar_

export default ({ contentBase, routes, disableBreadcrumbs, ...props }) => {
  const smUp = useMediaQuery(theme => theme.breakpoints.up('sm'))

  return (
    <Toolbar_ {...props}>
      {/* NAVIGATION MENU */}
      <Div sx={{ ml: 1 }} />
      <NavigationMenu routes={routes} />
      <Hidden smDown>
        <Divider flexItem orientation="vertical" sx={{ ml: 1, mr: 2 }} />
      </Hidden>

      <Hidden mdDown>
        {!disableBreadcrumbs && <Breadcrumbs contentBase={contentBase} routes={routes} />}
      </Hidden>

      <Div sx={{ ml: 'auto' }} />

      <Divider sx={{ mx: theme => theme.spacing(1) }} flexItem orientation="vertical" />
      <Tooltip placement="top-start" title="Submit data for curation">
        <Button
          href="https://saeon.ac.za/data-curation/"
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<SubmitIcon fontSize="small" />}
          size="small"
          variant="text"
          sx={theme => ({
            [theme.breakpoints.down('sm')]: {
              minWidth: 'unset',
              '& .MuiButton-endIcon': {
                ml: '1px !important',
              },
            },
          })}
        >
          <Typography sx={{ lineHeight: '100%' }} variant="overline">
            {smUp && 'Submit data'}
          </Typography>
        </Button>
      </Tooltip>
      <Div sx={{ mr: theme => theme.spacing(1) }} />

      <Authentication />
    </Toolbar_>
  )
}
