import { useContext } from 'react'
import Tooltip_, { tooltipClasses } from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import { styled } from '@mui/material/styles'
import { context as searchContext } from '../../../../../../contexts/search'

const Tooltip = styled(({ className, ...props }) => (
  <Tooltip_ {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    position: 'relative',
    top: theme.spacing(1),
  },
}))

export default ({ id }) => {
  const { global, setGlobal } = useContext(searchContext)
  const { selectedIds, selectAll } = global

  const checked = selectAll || selectedIds.includes(id)

  return (
    <Tooltip title={'Select record'} placement="top-start">
      <Checkbox
        size="small"
        color="primary"
        inputProps={{
          'aria-label': 'Select/unselect search result',
          'aria-checked': checked,
        }}
        checked={checked}
        indeterminate={selectAll}
        onChange={(e, checked) => {
          if (selectAll) {
            setGlobal({ selectedIds: [...new Set([...selectedIds, id])], selectAll: false })
          } else if (checked) {
            setGlobal({ selectedIds: [...new Set([...selectedIds, id])] })
          } else {
            setGlobal({
              selectedIds: selectedIds.filter(selectedId => selectedId !== id),
            })
          }
        }}
      />
    </Tooltip>
  )
}
