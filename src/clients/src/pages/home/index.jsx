import SkipLink from '../../components/skip-link'
import Search from './search'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { alpha } from '@material-ui/core/styles/colorManipulator'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  bg: {
    height: '10vh',
    backgroundColor: alpha(theme.palette.common.black, 0.4),
  },
}))

export default () => {
  const classes = useStyles()

  return (
    <>
      <SkipLink href="#home-search" text="Skip to main content" />
      <Search />
      <div className={clsx(classes.bg)} />
    </>
  )
}
