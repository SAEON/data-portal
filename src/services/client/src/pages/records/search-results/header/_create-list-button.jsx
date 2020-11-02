import { useContext } from 'react'
import { List as ListIcon } from '@material-ui/icons'
import { GlobalContext } from '../../../../contexts/global'
import ShareOrEmbed from '../../../../components/share-or-embed'
import StyledBadge from './components/styled-badge'

const removeSelectedIds = obj =>
  Object.fromEntries(Object.entries(obj).filter(([key]) => key !== 'selectedIds'))

export default ({ catalogue }) => {
  const { global } = useContext(GlobalContext)
  const { selectedIds } = global
  const resultCount = catalogue?.records.totalCount

  return (
    <ShareOrEmbed
      params={{ showSearchBar: false }}
      state={selectedIds.length ? { ids: selectedIds } : removeSelectedIds(global)}
      icon={<ListIcon />}
      iconProps={{
        color: 'default',
        disabled: !(selectedIds?.length || resultCount),
        style: { marginRight: 10 },
      }}
      tooltipProps={{
        title: `Share list of ${selectedIds?.length || resultCount} selected datasets`,
        placement: 'bottom',
      }}
      badgeProps={{
        color: selectedIds?.length || resultCount ? 'primary' : 'default',
        badgeContent: selectedIds?.length || resultCount || 0,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        invisible: false,
        _component: StyledBadge,
      }}
    />
  )
}
