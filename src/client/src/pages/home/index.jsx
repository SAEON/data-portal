import SkipLink from '../../components/skip-link'
import Search from './search'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { alpha } from '@material-ui/core/styles/colorManipulator'
import clsx from 'clsx'
import Header from './header'

const useStyles = makeStyles(theme => ({
  bg1: {
    padding: theme.spacing(12),
    backgroundColor: alpha(theme.palette.common.white, 0.5),
  },

  bg2: {
    padding: theme.spacing(12),
    backgroundColor: alpha(theme.palette.common.black, 0.4),
  },
  bg3: {
    height: '20vh',
    backgroundColor: alpha(theme.palette.common.black, 0.7),
  },
}))

export default () => {
  const classes = useStyles()

  return (
    <>
      <SkipLink href="#home-search" text="Skip to main content" />
      <Header />
      <Search />
      <div className={clsx(classes.bg3)}></div>
      {/* <div className={clsx(classes.bg1)}></div>
      <div className={clsx(classes.bg2)}></div> */}
    </>
  )
}
