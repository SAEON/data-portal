import { useContext } from 'react'
import { context as searchContext } from '../../../../../contexts/search'
import ShareOrEmbed from './create-share-link'
import StyledBadge from '../components/styled-badge'

export default ({ catalogue }) => {
  const { global } = useContext(searchContext)
  const { selectedIds, selectAll } = global
  const resultCount = catalogue?.search.totalCount
  const applicableRecordsCount = selectedIds?.length || (selectAll ? resultCount : 0)

  return (
    <ShareOrEmbed
      search={
        selectedIds.length
          ? { ids: selectedIds }
          : Object.fromEntries(
              Object.entries({ ...global }).filter(([key]) => key !== 'selectedIds')
            )
      }
      iconProps={{
        color: 'default',
        disabled: !applicableRecordsCount,
        style: { marginRight: 4 },
      }}
      tooltipProps={{
        title: `Share list of ${applicableRecordsCount} selected records`,
        placement: 'bottom',
      }}
      badgeProps={{
        color: applicableRecordsCount ? 'primary' : 'default',
        badgeContent: applicableRecordsCount,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        invisible: false,
        _component: StyledBadge,
      }}
    />
  )
}
