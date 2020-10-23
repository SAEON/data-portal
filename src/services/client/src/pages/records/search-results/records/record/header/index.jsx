import { Toolbar, Divider } from '@material-ui/core'
import clsx from 'clsx'
import useStyles from './style'
import Title from './_title'
import AtlasButton from './_atlas-button'
import CitationButton from './_citation-button'
import ToggleItemButton from './_toggle-item-button'

export default _source => {
  const classes = useStyles()

  return (
    <Toolbar
      className={clsx(classes.toolbar)}
      disableGutters
      variant="dense"
      style={{ display: 'flex', justifyContent: 'flex-end' }}
    >
      <Title {..._source} />
      <AtlasButton {..._source} />
      <CitationButton {..._source} />
      <Divider orientation="vertical" style={{ height: 16, margin: 16 }} />
      <ToggleItemButton {..._source} />
    </Toolbar>
  )
}
