import { useContext } from 'react'
import { List as ListIcon } from '@material-ui/icons'
import { GlobalContext } from '../../../../contexts/global'
import ShareOrEmbed from '../../../../components/share-or-embed'
import StyledBadge from './components/styled-badge'

const removeSelectedDois = obj =>
  Object.fromEntries(Object.entries(obj).filter(([key]) => key !== 'selectedDois'))

export default ({ catalogue }) => {
  const { global } = useContext(GlobalContext)
  const { selectedDois } = global
  const resultCount = catalogue?.records.totalCount

  return (
    <ShareOrEmbed
      params={{ showSearchBar: false }}
      state={selectedDois.length ? { dois: selectedDois } : removeSelectedDois(global)}
      icon={<ListIcon />}
      iconProps={{
        color: 'default',
        disabled: !(selectedDois?.length || resultCount),
        style: { marginRight: 10 },
      }}
      tooltipProps={{
        title: `Share list of ${selectedDois?.length || resultCount} selected datasets`,
        placement: 'bottom',
      }}
      badgeProps={{
        color: selectedDois?.length || resultCount ? 'primary' : 'default',
        badgeContent: selectedDois?.length || resultCount || 0,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        invisible: false,
        _component: StyledBadge,
      }}
    />
  )
}
