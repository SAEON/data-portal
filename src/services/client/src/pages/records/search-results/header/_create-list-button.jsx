import { useContext } from 'react'
import { List as ListIcon } from '@material-ui/icons'
import { context as globalContext } from '../../../../contexts/global'
import ShareOrEmbed from '../../../../components/share-or-embed'
import StyledBadge from './components/styled-badge'

export default ({ catalogue }) => {
  const { global } = useContext(globalContext)
  const { selectedIds } = global
  const resultCount = catalogue?.records.totalCount

  return (
    <ShareOrEmbed
      params={{ showSearchBar: false }}
      search={
        selectedIds.length
          ? { ids: selectedIds }
          : Object.fromEntries(
              Object.entries({ ...global }).filter(([key]) => key !== 'selectedIds')
            )
      }
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
