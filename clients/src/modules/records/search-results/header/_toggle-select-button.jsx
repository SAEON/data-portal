import { useContext } from 'react'
import Tooltip_, { tooltipClasses } from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import { context as searchContext } from '../../../../contexts/search'
import StyledBadge from './components/styled-badge'
import { Span } from '../../../../components/html-tags'
import { styled } from '@mui/material/styles'

const Tooltip = styled(({ className, ...props }) => (
  <Tooltip_ {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    position: 'relative',
    top: theme.spacing(-1.25),
  },
}))

export default ({ catalogue }) => {
  const { global, setGlobal } = useContext(searchContext)
  const { selectedIds, selectAll } = global
  const isIndeterminate = Boolean(selectedIds?.length)
  const resultCount = catalogue?.search.totalCount
  const applicableRecordsCount = selectedIds?.length || (selectAll ? resultCount : 0)

  return (
    <Tooltip title={selectAll || isIndeterminate ? `Unselect all records` : 'Select all records'}>
      <Span>
        <StyledBadge
          color={applicableRecordsCount ? 'primary' : 'default'}
          badgeContent={applicableRecordsCount}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          invisible={false}
          sx={{
            '& .MuiBadge-badge': {
              top: 12,
              right: 7,
            },
          }}
        >
          <Checkbox
            inputProps={{
              'aria-label': `Select/unselect all search results`,
              'aria-checked': selectAll,
            }}
            size="small"
            checked={isIndeterminate || selectAll ? true : false}
            onChange={e => {
              const { checked: selectAll } = e.target
              if (isIndeterminate) {
                setGlobal({ selectedIds: [], selectAll: false })
              } else if (selectAll) {
                setGlobal({ selectAll: true })
              } else {
                setGlobal({ selectAll: false })
              }
            }}
            color="default"
            indeterminate={isIndeterminate}
          />
        </StyledBadge>
      </Span>
    </Tooltip>
  )
}
