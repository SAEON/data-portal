import { useContext } from 'react'
import Toolbar from './toolbar'
import Authentication from './auth'
import ShareOrEmbed from '../../share-or-embed'
import { context as globalContext } from '../../../contexts/global'
import NavMenu from './nav'
import useTheme from '@material-ui/core/styles/useTheme'

export default () => {
  const { global } = useContext(globalContext)
  const { selectedIds } = global
  const theme = useTheme()

  return (
    <Toolbar>
      <NavMenu />

      {window.location.pathname.includes('atlas') && (
        <ShareOrEmbed
          search={
            selectedIds.length && window.location.pathname.includes('atlas')
              ? { ids: selectedIds }
              : global
          }
        />
      )}

      {!window.location.pathname.includes('login') && (
        <div style={{ marginRight: theme.spacing(1), marginLeft: 'auto' }}>
          <Authentication />
        </div>
      )}
    </Toolbar>
  )
}
