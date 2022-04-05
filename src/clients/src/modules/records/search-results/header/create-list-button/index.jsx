import { useContext } from 'react'
import ListIcon from '@mui/icons-material/List'
import { context as globalContext } from '../../../../../contexts/global'
import ShareOrEmbed from './create-share-link'
import StyledBadge from '../components/styled-badge'

export default ({ catalogue }) => {
  const { global } = useContext(globalContext)
  const { selectedIds, selectAll } = global
  const resultCount = catalogue?.records.totalCount
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
      icon={<ListIcon />}
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
