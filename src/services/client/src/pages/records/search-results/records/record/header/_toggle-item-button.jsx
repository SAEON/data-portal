import { useContext } from 'react'
import { Tooltip, Checkbox } from '@material-ui/core'
import { GlobalContext } from '../../../../../../contexts/global'

export default ({ doi }) => {
  const { global, setGlobal } = useContext(GlobalContext)
  const { selectedDois } = global

  return (
    <Tooltip title={'Select record'} placement="left-start">
      <Checkbox
        style={{ marginRight: 4 }}
        size="small"
        color="primary"
        checked={selectedDois.includes(doi)}
        onChange={(e, checked) =>
          checked
            ? setGlobal({ selectedDois: [...new Set([...selectedDois, doi])] })
            : setGlobal({ selectedDois: selectedDois.filter(selectedDoi => selectedDoi !== doi) })
        }
      />
    </Tooltip>
  )
}
